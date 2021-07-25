import React, { useState, useEffect, useRef } from "react";
import Utils from "@discovery-solutions/utils";

const renderComponent = (Component, style = null, returnComponent) => {
	if (["object", "function"].includes(typeof Component) === false)
		return null;

	if (typeof Component === "object") {
		const Clone = React.cloneElement(Component, { style });

		return Clone;
	}

	if (returnComponent)
		return Component;

	return <Component style={ style } />
};

const FlatList = ({
	onEndReached = () => null,
	onTopReached = () => null,
	renderItem = () => null,
	initialNumToRender = 30,
	data,
	...rest
}, ref) => {
	if (Array.isArray(data) !== true)
		data = [];

	const [ limit, setLimit ] = useState(initialNumToRender);
    const [ slicedData, setSlicedData ] = useState( data.slice(0, limit) );
	const footerID = useRef(`flatlist-footer-${ Date.now() }`).current;
    let listeners = useRef(global.octal_dev_flatlist_on_scroll_listeners).current;
	let Container = rest.Component || (props => <div { ...props }/>);

	const getContainer = () => {
		try {
			return document.getElementById(footerID).parentNode;
		} catch (e) {
			// console.log(e);
			return {};
		}
	}

	const getParentNode = () => getContainer().parentNode;

	const scrollTo = index => {
		try {
      		getContainer().childNodes[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      	} catch (e) {
      		// console.log(e);
      	}
	}

	const scrollToIndex = React.useCallback(index => {
		if (index > limit)
			setLimit(index + initialNumToRender);

		return scrollTo(index)
	}, [ scrollTo, limit, setLimit ]);

	const onScroll = (useCallbacks = true) => {
        if (!getParentNode())
            return null;

		const { scrollTop, scrollHeight, offsetHeight } = getParentNode();
		const contentHeight = scrollHeight - offsetHeight;

		if (scrollTop === 0 && useCallbacks)
			onTopReached();

		if (contentHeight <= scrollTop) {
            if (useCallbacks)
		         onEndReached();

            if (limit < data.length)
		         setLimit(limit + initialNumToRender);
		}
	}

    const keyExtractor = (item, index) => {
        if (rest?.keyExtractor && typeof rest.keyExtractor === "function")
            return rest.keyExtractor(item, index);

        return index;
    }

    const handleScrolls = useCallbacks => {
        try {
            listeners[footerID](useCallbacks);
        } catch (e) {
            // console.log(e);
        }
    }

	useEffect(() => {
		if (Utils.compareObjects(data, slicedData) === false)
			setSlicedData( data.slice(0, limit) );
	}, [ data, slicedData, setSlicedData, limit ]);

	useEffect(() => {
		if (getParentNode() && (limit !== initialNumToRender || slicedData.length === 0))
			setSlicedData( data.slice(0, limit) );
	}, [ limit, data ]);

    React.useImperativeHandle(ref, () => ({
        scrollToIndex,
        scrollToEnd: forceEnd => {
            if (forceEnd)
                return scrollToIndex(data.length - 1);

            return scrollToIndex(limit - 1);
        },
    }) );

	useEffect(() => {
		handleScrolls(false);
	}, [handleScrolls]);

    useEffect(() => {
        let updatedListeners = global.octal_dev_flatlist_on_scroll_listeners;

        if (typeof updatedListeners !== "object") {
            updatedListeners = {
                [footerID]: onScroll
            };
        } else {
            updatedListeners[footerID] = onScroll;
        }

        listeners = updatedListeners;
    }, [ onScroll ]);

	useEffect(() => {
		const parent = getParentNode();
        const listener = () => handleScrolls(true);

		if (parent) {
			parent.addEventListener("scroll", listener);

			return () => parent.removeEventListener("scroll", listener);
		}
	}, [ onScroll, getContainer, handleScrolls ]);

    const Item = ({ data }) => renderItem(data)

	return (
		<Container { ...rest }>
			{renderComponent(rest.ListHeaderComponent, rest.ListHeaderComponentStyle)}

			{(data.length > 0) ? (
				slicedData.map((item, index) =>
	                <Item key={ keyExtractor(item, index) } data={{ item, index }}/>
	            )
			) : (
				renderComponent(rest.ListEmptyComponent)
			)}

			{renderComponent(rest.ListFooterComponent, rest.ListFooterComponentStyle)}

			<div id={ footerID }/>
		</Container>
	)
}

export default React.forwardRef(FlatList);
