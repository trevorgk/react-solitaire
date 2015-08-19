/// <reference path="../typing/react.d.ts" />
class DemoProps {
}
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.foo = 42;
    }
    render() {
        return (React.createElement("div", null, "Hello world!"));
    }
}
