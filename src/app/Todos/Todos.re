type item = {
  id: int,
  title: string,
  completed: bool,
};

type state = {items: list(item)};

type action =
  | AddItem(string)
  | ToggleItem(int);

let lastId = ref(0);
let newItem = text => {
  lastId := lastId^ + 1;
  {id: lastId^, title: text, completed: true};
};

module TodoItem = {
  [@react.component]
  let make = (~item, ~onToggle) => {
    <div className="item" onClick={_evt => onToggle()}>
      <input type_="checkbox" checked={item.completed} readOnly=true />
      {item.title |> React.string}
    </div>;
  };

  type state = string;
  [@react.component]
  let input = (~onSubmit) => {
    let (text, setText) =
      React.useReducer((oldText, newText) => newText, "");

    <input
      type_="input"
      value=text
      placeholder="Write some tasks"
      onChange={evt => setText(ReactEvent.Form.target(evt)##value)}
      onKeyDown={evt =>
        if (ReactEvent.Keyboard.key(evt) === "Enter") {
          onSubmit(text);
          setText("");
        }
      }
    />;
  };
};

[@react.component]
let make = () => {
  let ({items}, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | AddItem(text) => {items: [newItem(text), ...state.items]}
        | ToggleItem(id) =>
          let items =
            List.map(
              item =>
                item.id === id ? {...item, completed: !item.completed} : item,
              state.items,
            );
          {items: items};
        },
      {items: [{id: 0, title: "Some todo item", completed: false}]},
    );

  let numItems = List.length(items);
  let label = numItems > 1 ? "items" : "item";

  <div className="todos">
    <TodoItem.input onSubmit={text => dispatch(AddItem(text))} />
    <div className="items">
      {List.map(
         item =>
           <TodoItem
             onToggle={() => dispatch(ToggleItem(item.id))}
             key={item.id |> string_of_int}
             item
           />,
         items,
       )
       |> Array.of_list
       |> React.array}
    </div>
    <div className="footer">
      {React.string(string_of_int(numItems) ++ " " ++ label)}
    </div>
  </div>;
};
