const style = {};

function Loading({ children }) {
  return <div style={style}>{children || 'Once moment!'}</div>;
}
export default Loading;
