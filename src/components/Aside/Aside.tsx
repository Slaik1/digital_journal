import Groups from './Groups/Groups';
import JournalType from './JournalType/JournalType';

const Aside: React.FC = () => {
  return (
    <>
      <JournalType />
      <Groups />
    </>
  );
};

export default Aside;
