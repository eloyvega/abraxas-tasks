import React from 'react';

import './index.css';
import 'antd/dist/antd.css';

import { Input, Select } from 'antd';

const Option = Select.Option;
const Search = Input.Search;

const DURATION_TO_LTE_QUERY_VALUE = {
  "": 7200,
  "corta": 1800,
  "media": 3600,
  "larga": 7200
};

const DURATION_TO_GTE_QUERY_VALUE = {
  "": 0,
  "corta": 0,
  "media": 1800,
  "larga": 3600
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: "",
      finished: undefined,
      duration_Lte: 7200,
      duration_Gte: 0
    };
  }

  getStatusFilter() {
    return (
      <div style={{display: "flex"}}>
        <p style={{ marginRight: "5px", fontWeight: "bold"}}
          data-step="5"
          data-intro="Puedes filtrar tus tareas según su estado (terminadas y pendientes) ✅"
        >
          Filtrar por estado
        </p>
        <Select defaultValue="" style={{width: "120px"}} onChange={(value) => {
          let finished = null;
          if (value === "terminada")
            finished = true;
          if (value === "pendiente")
            finished = false;
          this.setState({finished});
          this.props.onClickSearch({...this.state, finished});
        }}>
          <Option value="">Todo</Option>
          <Option value="pendiente">Pendiente</Option>
          <Option value="terminada">Terminada</Option>
        </Select>
      </div>
    );
  }

  getDurationFilter() {
    return (
      <div style={{ display: "flex" }}>
        <p style={{ marginRight: "5px", fontWeight: "bold", marginLeft: "5px" }}
          data-step="6"
          data-intro="También por duración: CORTAS (30 minutos o menos), MEDIAS (de 30 a 60 minutos) y LARGAS (de 1 a 2 horas)"
        >
          Filtrar por duración
        </p>
        <Select defaultValue="" style={{width: "120px"}} onChange={(durationName) => {
          const durationFilter = {
            duration_Gte: DURATION_TO_GTE_QUERY_VALUE[durationName],
            duration_Lte: DURATION_TO_LTE_QUERY_VALUE[durationName]
          };
          this.setState({...durationFilter});
          this.props.onClickSearch({...this.state, ...durationFilter})
        }}>
          <Option value="">Todo</Option>
          <Option value="corta">Corta</Option>
          <Option value="media">Media</Option>
          <Option value="larga">Larga</Option>
        </Select>
      </div>
    );
  }

  render() {
    return (
      <div className="tasks-filter">
        <div
          data-step="4"
          data-intro="Puedes buscar tus tareas a partir de la descripción 🔍"
        >
          <Search
            placeholder="Buscar por descripción"
            onSearch={() => {this.props.onClickSearch(this.state) }}
            onChange={(evt) => {
              let detail = evt.target.value;
              if (detail.length > 0)
                this.setState({detail});
              else
                this.setState({detail: undefined});
            }}
            enterButton
          />
        </div>

        <div style={{display: "flex", marginTop: "10px"}}>
          {this.getStatusFilter()}
          {this.getDurationFilter()}
        </div>
      </div>
    )
  }
}
