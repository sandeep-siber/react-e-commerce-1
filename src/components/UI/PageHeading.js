function PageHeading({ children, left }) {
  const styles = {
    font: 'inherit',
    fontSize: '24px',
    fontWeight: 'normal',
    textAlign: left ? 'left' : 'center',
    color: '#444',
  };

  return <h1 style={styles}>{children}</h1>;
}

export default PageHeading;
