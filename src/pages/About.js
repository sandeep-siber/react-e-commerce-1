import PageContainer from '../components/UI/PageContainer';
import AboutUs from '../components/About/AboutUs';

function AboutPage() {
  return (
    <PageContainer>
      <header className='page-header'>
        <h1>About Us</h1>
      </header>
      <AboutUs />
    </PageContainer>
  );
}
export default AboutPage;
