import React, { useState, useRef, useEffect, forwardRef } from "react";

const footerID = `flatlist-footer-${ Date.now() }`;

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
	renderItem = () => null,
	initialNumToRender = 30,
	data,
	...rest
}, ref) => {
	const [ limit, setLimit ] = useState(initialNumToRender);
	const container = useRef({});
	const slicedData = data.slice(0, limit);
	let Container = rest.Component ? forwardRef(rest.Component) : (props => <div { ...props }/>);

	const scrollTo = index => {
		try {
      		container.current.childNodes[index].scrollIntoView({ behavior: "smooth", block: "start" });
      	} catch (e) {
      		console.log(e);
      	}
	}

	const scrollToIndex = React.useCallback(index => {
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
			return document.getElementById(footerID).parentNode.parentNode;
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

		if (parent) {
			parent.addEventListener("scroll", onScroll);

			return () => parent.removeEventListener("scroll", onScroll);
		}
	}, [ onScroll, container ]);

	if (Array.isArray(data) === false)
		return null;

	return (
		<Container ref={ container } { ...rest }>
			{renderComponent(rest.ListHeaderComponent, rest.ListHeaderComponentStyle)}

			{ slicedData.map((item, index) => renderItem({ item, index })) }

			{renderComponent(rest.ListFooterComponent, rest.ListFooterComponentStyle)}

			<div id={ footerID }/>
		</Container>
	)
}

export default forwardRef(FlatList);
