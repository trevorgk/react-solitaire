
const rootEl = document.getElementById('root');

observe(knightPosition =>
        React.render(
            <Board knightPosition={knightPosition} />,
            rootEl
        )
);