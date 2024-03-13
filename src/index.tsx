import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
}

export interface Props {
  params: Param[];
  model: Model;
}

export interface State {
  paramValues: ParamValue[];
}

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
  {
    id: 3,
    name: "Размер",
    type: "string",
  },
  {
    id: 4,
    name: "Цвет",
    type: "string",
  },
];

const model: State = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
    {
      paramId: 3,
      value: "Большой",
    },
    {
      paramId: 4,
      value: "Белый",
    },
  ],
};
class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { paramValues: props.model.paramValues };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((state) => ({
      paramValues: state.paramValues.map((element) =>
        element.paramId === paramId ? { ...element, value } : element
      ),
    }));
  };

  getModel = (): Model => {
    return {
      paramValues: this.state.paramValues,
    };
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;
    return (
      <div>
        {params.map((element) => (
          <div key={element.id}>
            <label>{element.name}</label>
            <input
              type="text"
              value={
                paramValues.find((pv) => pv.paramId === element.id)?.value || ""
              }
              onChange={(e) =>
                this.handleChange(element.id, e.currentTarget.value)
              }
            />
          </div>
        ))}
      </div>
    );
  }
}


export const App = () => { 
  return (
    <div>
      <ParamEditor model={model} params={params as Param[]} />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

