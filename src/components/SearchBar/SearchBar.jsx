import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import css from "./SearchBar.module.css"
export default function SearchBar({onSearch }) {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        if (values.query === "") {
          toast.error("необхідно ввести текст", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
        } else {
          onSearch(values.query);
            actions.resetForm();
          
        }
      }}
    >
      <Form>
        <header>
          <Field
            className={css.input}
            type="text"
            placeholder="Search images and photos"
            name="query"
            
          />
          <button className={css.button} type="submit">Search</button>
          <Toaster />
        </header>
      </Form>
    </Formik>
  );
}
