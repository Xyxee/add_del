const Item = (props) => {
  const { email, _id } = props;
  return <li key={_id}>{email}</li>;
};
export default Item;
