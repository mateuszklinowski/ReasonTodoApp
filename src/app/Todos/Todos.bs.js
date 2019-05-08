// Generated by BUCKLESCRIPT VERSION 5.0.4, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

var lastId = /* record */[/* contents */0];

function newItem(text) {
  lastId[0] = lastId[0] + 1 | 0;
  return /* record */[
          /* id */lastId[0],
          /* title */text,
          /* completed */true
        ];
}

function Todos$TodoItem(Props) {
  var item = Props.item;
  var onToggle = Props.onToggle;
  return React.createElement("div", {
              className: "item",
              onClick: (function (_evt) {
                  return Curry._1(onToggle, /* () */0);
                })
            }, React.createElement("input", {
                  checked: item[/* completed */2],
                  readOnly: true,
                  type: "checkbox"
                }), item[/* title */1]);
}

function Todos$TodoItem$input(Props) {
  var onSubmit = Props.onSubmit;
  var match = React.useReducer((function (oldText, newText) {
          return newText;
        }), "");
  var setText = match[1];
  var text = match[0];
  return React.createElement("input", {
              placeholder: "Write some tasks",
              type: "input",
              value: text,
              onKeyDown: (function (evt) {
                  if (evt.key === "Enter") {
                    Curry._1(onSubmit, text);
                    return Curry._1(setText, "");
                  } else {
                    return 0;
                  }
                }),
              onChange: (function (evt) {
                  return Curry._1(setText, evt.target.value);
                })
            });
}

var TodoItem = /* module */[
  /* make */Todos$TodoItem,
  /* input */Todos$TodoItem$input
];

function Todos(Props) {
  var match = React.useReducer((function (state, action) {
          if (action.tag) {
            var id = action[0];
            var items = List.map((function (item) {
                    var match = item[/* id */0] === id;
                    if (match) {
                      return /* record */[
                              /* id */item[/* id */0],
                              /* title */item[/* title */1],
                              /* completed */!item[/* completed */2]
                            ];
                    } else {
                      return item;
                    }
                  }), state[/* items */0]);
            return /* record */[/* items */items];
          } else {
            return /* record */[/* items : :: */[
                      newItem(action[0]),
                      state[/* items */0]
                    ]];
          }
        }), /* record */[/* items : :: */[
          /* record */[
            /* id */0,
            /* title */"Some todo item",
            /* completed */false
          ],
          /* [] */0
        ]]);
  var dispatch = match[1];
  var items = match[0][/* items */0];
  var numItems = List.length(items);
  var match$1 = numItems > 1;
  var label = match$1 ? "items" : "item";
  return React.createElement("div", {
              className: "todos"
            }, React.createElement(Todos$TodoItem$input, {
                  onSubmit: (function (text) {
                      return Curry._1(dispatch, /* AddItem */Block.__(0, [text]));
                    })
                }), React.createElement("div", {
                  className: "items"
                }, $$Array.of_list(List.map((function (item) {
                            return React.createElement(Todos$TodoItem, {
                                        item: item,
                                        onToggle: (function (param) {
                                            return Curry._1(dispatch, /* ToggleItem */Block.__(1, [item[/* id */0]]));
                                          }),
                                        key: String(item[/* id */0])
                                      });
                          }), items))), React.createElement("div", {
                  className: "footer"
                }, String(numItems) + (" " + label)));
}

var make = Todos;

exports.lastId = lastId;
exports.newItem = newItem;
exports.TodoItem = TodoItem;
exports.make = make;
/* react Not a pure module */