import React, { PropTypes } from 'react';

const propTypes = {
  config: PropTypes.object,
  updateConfig: PropTypes.func
};

const defaultProps = {

};

export default class PlayerSettings extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, path) {
    console.log(event.target);
    this.props.updateConfig(path, event.target.value);
  }

  render() {
    const { config } = this.props;
    const playerConfig = config.get('player');

    return (
      <div className="settings-submenu">
        <form>
          <input
            type="number"
            minValue="1"
            defaultValue={playerConfig.get('skipBackwardDuration')}
            onChange={(e) => this.handleChange(e, ["player", "skipBackwardDuration"])} />
        </form>
      </div>
    );
  }
}

PlayerSettings.propTypes = propTypes;
PlayerSettings.defaultProps = defaultProps;
