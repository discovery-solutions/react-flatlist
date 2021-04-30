import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

const renderComponent = (Component, style) => {
	if (["object", "function"].includes(typeof Component) === false)
		return null;

	if (typeof Component === "object") {
		const Clone = React.cloneElement(Component, { style });

		return Clone;
	}

	return <Component style={ style } />
};

const FlatList = ({
	onEndReached = () => null,
	renderItem = () => null,
	initialNumToRender = 30,
	data,
	...rest
}, ref) => {
	const [ limit, setLimit ] = useState(initialNumToRender);
	const container = useRef({});
	const slicedData = data.slice(0, limit);

	const scrollTo = index => {
		try {
      		container.current.childNodes[index].scrollIntoView({ behavior: "smooth", block: "start" });
      	} catch (e) {
      		console.log(e);
      	}
	}

	const scrollToIndex = useCallback(index => {
		if (index > limit)
			setLimit(index + initialNumToRender);

		return scrollTo(index)
	}, [ scrollTo, limit, setLimit ]);

	React.useImperativeHandle(ref, () => ({
		scrollToIndex,
		scrollToEnd: forceEnd => {
			if (forceEnd)
				return scrollToIndex(data.length - 1);

			return scrollToIndex(limit - 1);
		},
  	}) );

	const getParentNode = () => {
		try {
			return ReactDOM.findDOMNode(container.current).parentNode;
		} catch (e) {
			return undefined;
		}
	}

	const onScroll = () => {
		const { scrollTop, scrollHeight, offsetHeight } = getParentNode();
		const contentHeight = scrollHeight - offsetHeight;

		if (contentHeight <= scrollTop) {
			onEndReached();
			setLimit(limit + initialNumToRender);
		}
	}

	useEffect(() => {
		const parent = getParentNode();

		parent.addEventListener("scroll", onScroll);

		return () => parent.removeEventListener("scroll", onScroll);
	}, [ onScroll ]);

	if (Array.isArray(data) === false)
		return null;

	return (
		<div ref={ container }>
			{renderComponent(rest.ListHeaderComponent, rest.ListHeaderComponentStyle)}

			{ slicedData.map((item, index) => renderItem({ item, index })) }

			{renderComponent(rest.ListFooterComponent, rest.ListFooterComponentStyle)}
		</div>
	)
}

export default React.forwardRef(FlatList);
