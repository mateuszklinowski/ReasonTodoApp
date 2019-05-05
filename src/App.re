type item = {
  title: string,
  completed: bool,
};

type state = {items: list(item)};

[@react.component]
let make = (~title) => {
  let ({items}, dispatch) =
    React.useReducer(
      (state, action) => state,
      {items: [{title: "Some todo item", completed: false}]},
    );

  let numItems = List.length(items);

  <div className="app">
    <div className="title"> {React.string(title)} </div>
    <div className="items"> {React.string("Empty")} </div>
    <div className="footer">
      {React.string(string_of_int(numItems) ++ " items ")}
    </div>
  </div>;
};
