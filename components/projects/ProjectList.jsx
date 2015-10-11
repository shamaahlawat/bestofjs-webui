var React = require('react');
var Router = require('react-router');
var TagLabel = require('../tags/TagLabelCompact');
var flux = require('../../scripts/app');
var Delta = require('../common/utils/Delta');
var DeltaBar = require('../common/utils/DeltaBar');
var Stars = require('../common/utils/Stars');
var StarSparkline = require('./StarSparkline');


var {Link} = Router;

var ProjectList = React.createClass({

  getDefaultProps: function () {
    return ({
      showTags: true,
      showDescription: true,
      showStars: true,
      showDelta: true,
      showURL: false
    });
  },

  getInitialState: function() {
    //var el = this.getDOMNode();
    //var width = el.offsetWidth;
    return {
      width: 0
    };
  },
  componentDidMount: function() {
    setTimeout(this.setWidth);
  },
  setWidth: function () {
    var el = this.getDOMNode();
    var width = el.offsetWidth;
    this.setState({
      width: width
    });
  },

  onChangeText: function (e) {
    flux.actions.changeText( e.target.value);
  },

  render: function () {
    return(
      <div>
        {this.props.projects.map( (project, index) =>
          <ProjectList.Item
            { ...this.props }
            project={ project }
            maxStars={ this.props.maxStars }
            key={ project._id }
            index={ index }
            width={ this.state.width }
          />)
        }
      </div>
    );
  }

});


ProjectList.Item = React.createClass({
  render: function () {
    var style = {
      container: {
        marginBottom: 15,
        padding: 0,
        backgroundColor: 'white',
        verticalAlign: 'top',
        border: '1px solid #cbcbcb',
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16)'
      },
      starsBar: {
        height: 3,
        backgroundColor: '#ffe082',
        width: (this.props.project.stars * 100 / this.props.maxStars).toFixed() + '%'
      },
      inner: {
        padding: '1em',
        position: 'relative'
      },
      ranking: {
        position: 'absolute',
        top: -10,
        left: 15,
        color: '#ccc',
        fontSize: 64,
        letterSpacing: -10
      },
      link: {
        fontSize: '1.2em',
        marginBottom: 5,
        paddingLeft: 20,
        zIndex:2,
        position: 'relative',
        display: 'block',
        textAlign: 'center'
      }
    };
    var {project, index, width} = this.props;

    //console.log('Display the project', project);
    return (
      <div className="card">
        <div style={ style.starsBar } />
        <div style= { style.inner }>

          {true && (
            <div style={ style.ranking }>
              { index + 1 }
            </div>
          )}

          <div style={{ float: 'right' }}>
            { this.props.showStars && (
              <div style={{ fontSize: '1.2em' }}>
                <Stars
                  value={ this.props.project.stars }
                  icon={ true }
                />
              </div>
            )}

            {  this.props.showDelta && project.deltas.length > 0 && (
              <div style={{ fontSize: 16 }}>
                <Delta
                  value={ this.props.project.delta1 }
                  big={ true }
                  icon={ true }
                />
              </div>
            ) }

          </div>

          <Link
            to={ 'projects' }
            params={{ id: this.props.project._id }}
            style={ style.link }
          >
          { this.props.project.name }
          </Link>
          { this.props.showURL && this.props.project.url && (
            <a style={{ display: 'block', marginTop: '1em' }} href={ this.props.project.url }>
              { this.props.project.url }
            </a>
          )}
          { this.props.showDescription && (
            <p style={{ zIndex:2, position: 'relative' }}>
              <Link
                to={ 'projects' }
                params={{ id: this.props.project._id }}
                className="description"
              >
                { this.props.project.description }
              </Link>
            </p>
          )}
          { this.props.showTags && (
            <div style={{ marginBottom: 5 }}>
              { this.props.project.tags.map( (tag, i) =>
                <TagLabel tag={ tag } key={ i } /> )
              }
            </div>
          )}
        </div>

        <div>
          { width > 0 && (
            <StarSparkline
              deltas={ project.deltas }
              starsNow={ project.stars }
              width={ width }
            />
          )}
          { project.deltas.length > 0 &&
            <DeltaBar data={ project.deltas.slice(0,7) } />
          }
        </div>

      </div>
    );

  }
});

module.exports = ProjectList;
