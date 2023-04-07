import Card from '../../components/UI/Card';
import classes from './AboutUs.module.css';

function AboutUs() {
  return (
    <Card className={classes['about-us']}>
      <div className={classes['about-us__image']}>
        <img
          src='https://newsmobile.in/wp-content/uploads/2016/11/CyJ_5REUUAAokSr.jpg'
          alt='Operation Flood'
        />
      </div>

      <h2>Operation Flood</h2>

      <h3>
        Operation Flood: one of the world's largest rural development
        programmes.
      </h3>

      <p>
        Launched in 1970, Operation Flood has helped dairy farmers direct their
        own development, placing control of the resources they create in their
        own hands. A National Milk Grid links milk producers throughout India
        with consumers in over 700 towns and cities, reducing seasonal and
        regional price variations while ensuring that the producer gets fair
        market prices in a transparent manner on a regular basis.
      </p>

      <p>
        The bedrock of Operation Flood has been village milk producers'
        cooperatives, which procure milk and provide inputs and services, making
        modern management and technology available to members. Operation Flood's
        objectives included :
      </p>

      <ul>
        <li>Increase milk production ("a flood of milk")</li>
        <li>Augment rural incomes</li>
        <li>Reasonable prices for consumers</li>
      </ul>
    </Card>
  );
}

export default AboutUs;
