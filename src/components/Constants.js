export const ItemTypes = {
  FOUNDATION: 'foundation'
};

const foundationTarget = {
  drop(props, monitor) {
    moveCard(props.card);
  }
};
