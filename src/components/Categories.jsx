import { Link } from 'react-router-dom';
import styles from './Categories.module.css';


const Categories = (props) => {
  return (
    <div className={styles.block}>
      {props.categories.map(c => (
        <Link to={c.name === 'all' ? '/' : `/${c.name}`} key={c.name}
        className={styles.category}>

          {c.text}
        </Link>
      ))}
    </div>
  );
};
export default Categories;