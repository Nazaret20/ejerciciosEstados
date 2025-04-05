import ToDoList from "./ToDoList";
import ShoppingCart from "./ShoppingCart";
import '../../styles/UseReducerPractice.css'

const UseReducerPractice = () => {
  return (
    <section className="section-usereducer">
      <ToDoList />
      <ShoppingCart />
    </section>
  );
};

export default UseReducerPractice;
