var props = {
    key: 42,
    ref: "myComponent42",
    hello: "world",
    foo: 42,
    bar: true
};
var container;
var ClassicComponent = React.createClass({
    getDefaultProps: () => {
        return {
            hello: undefined,
            world: "peace",
            foo: undefined,
            bar: undefined
        };
    },
    getInitialState: () => {
        return {
            inputValue: this.context.someValue,
            seconds: this.props.foo
        };
    },
    reset: () => {
        this.replaceState(this.getInitialState());
    },
    render: () => {
        return React.DOM.div(null, React.DOM.input({
            ref: input => this._input = input,
            value: this.state.inputValue
        }));
    }
});
class ModernComponent extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            inputValue: this.context.someValue,
            seconds: this.props.foo
        };
    }
    getChildContext() {
        return {
            someOtherValue: 'foo'
        };
    }
    reset() {
        this.setState({
            inputValue: this.context.someValue,
            seconds: this.props.foo
        });
    }
    render() {
        return React.DOM.div(null, React.DOM.input({
            ref: input => this._input = input,
            value: this.state.inputValue
        }));
    }
}
ModernComponent.propTypes = {
    foo: React.PropTypes.number
};
ModernComponent.contextTypes = {
    someValue: React.PropTypes.string
};
ModernComponent.childContextTypes = {
    someOtherValue: React.PropTypes.string
};
var factory = React.createFactory(ModernComponent);
var factoryElement = factory(props);
var classicFactory = React.createFactory(ClassicComponent);
var classicFactoryElement = classicFactory(props);
var domFactory = React.createFactory("foo");
var domFactoryElement = domFactory();
var element = React.createElement(ModernComponent, props);
var classicElement = React.createElement(ClassicComponent, props);
var domElement = React.createElement("div");
var clonedElement = React.cloneElement(element, props);
var clonedClassicElement = React.cloneElement(classicElement, props);
var clonedDOMElement = React.cloneElement(domElement);
var component = React.render(element, container);
var classicComponent = React.render(classicElement, container);
var domComponent = React.render(domElement, container);
var unmounted = React.unmountComponentAtNode(container);
var str = React.renderToString(element);
var markup = React.renderToStaticMarkup(element);
var notValid = React.isValidElement(props);
var isValid = React.isValidElement(element);
React.initializeTouchEvents(true);
var domNode = React.findDOMNode(component);
domNode = React.findDOMNode(domNode);
var type = element.type;
var elementProps = element.props;
var key = element.key;
var displayName = ClassicComponent.displayName;
var defaultProps = ClassicComponent.getDefaultProps();
var propTypes = ClassicComponent.propTypes;
var componentState = component.state;
component.setState({ inputValue: "!!!" });
component.forceUpdate();
var htmlElement = classicComponent.getDOMNode();
var divElement = classicComponent.getDOMNode();
var isMounted = classicComponent.isMounted();
classicComponent.setProps(elementProps);
classicComponent.replaceProps(props);
classicComponent.replaceState({ inputValue: "???", seconds: 60 });
var myComponent = component;
myComponent.reset();
var children = ["Hello world", [null], React.DOM.span(null)];
var divStyle = {
    flex: "1 1 main-size",
    backgroundImage: "url('hello.png')"
};
var htmlAttr = {
    key: 36,
    ref: "htmlComponent",
    children: children,
    className: "test-attr",
    style: divStyle,
    onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
    },
    dangerouslySetInnerHTML: {
        __html: "<strong>STRONG</strong>"
    }
};
React.DOM.div(htmlAttr);
React.DOM.span(htmlAttr);
React.DOM.input(htmlAttr);
React.DOM.svg({ viewBox: "0 0 48 48" }, React.DOM.rect({
    x: 22,
    y: 10,
    width: 4,
    height: 28
}), React.DOM.rect({
    x: 10,
    y: 22,
    width: 28,
    height: 4
}));
var PropTypesSpecification = {
    propTypes: {
        optionalArray: React.PropTypes.array,
        optionalBool: React.PropTypes.bool,
        optionalFunc: React.PropTypes.func,
        optionalNumber: React.PropTypes.number,
        optionalObject: React.PropTypes.object,
        optionalString: React.PropTypes.string,
        optionalNode: React.PropTypes.node,
        optionalElement: React.PropTypes.element,
        optionalMessage: React.PropTypes.instanceOf(Date),
        optionalEnum: React.PropTypes.oneOf(["News", "Photos"]),
        optionalUnion: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.instanceOf(Date)
        ]),
        optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
        optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
        optionalObjectWithShape: React.PropTypes.shape({
            color: React.PropTypes.string,
            fontSize: React.PropTypes.number
        }),
        requiredFunc: React.PropTypes.func.isRequired,
        requiredAny: React.PropTypes.any.isRequired,
        customProp: function (props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
                return new Error("Validation failed!");
            }
            return null;
        }
    },
    render: () => {
        return null;
    }
};
var ContextTypesSpecification = {
    contextTypes: {
        optionalArray: React.PropTypes.array,
        optionalBool: React.PropTypes.bool,
        optionalFunc: React.PropTypes.func,
        optionalNumber: React.PropTypes.number,
        optionalObject: React.PropTypes.object,
        optionalString: React.PropTypes.string,
        optionalNode: React.PropTypes.node,
        optionalElement: React.PropTypes.element,
        optionalMessage: React.PropTypes.instanceOf(Date),
        optionalEnum: React.PropTypes.oneOf(["News", "Photos"]),
        optionalUnion: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.instanceOf(Date)
        ]),
        optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
        optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
        optionalObjectWithShape: React.PropTypes.shape({
            color: React.PropTypes.string,
            fontSize: React.PropTypes.number
        }),
        requiredFunc: React.PropTypes.func.isRequired,
        requiredAny: React.PropTypes.any.isRequired,
        customProp: function (props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
                return new Error("Validation failed!");
            }
            return null;
        }
    },
    render: () => {
        return null;
    }
};
var childMap = React.Children.map(children, (child) => { return 42; });
React.Children.forEach(children, (child) => { });
var nChildren = React.Children.count(children);
var onlyChild = React.Children.only([null, [[["Hallo"], true]], false]);
class Timer extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            secondsElapsed: 0
        };
    }
    tick() {
        this.setState((prevState, props) => ({
            secondsElapsed: prevState.secondsElapsed + 1
        }));
    }
    componentDidMount() {
        this._interval = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this._interval);
    }
    render() {
        return React.DOM.div(null, "Seconds Elapsed: ", this.state.secondsElapsed);
    }
}
React.render(React.createElement(Timer), container);
