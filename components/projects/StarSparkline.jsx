var React = require('react');
var lines = require('react-sparklines');
var { Sparklines, SparklinesBars, SparklinesLine, SparklinesSpots } = lines;

var StarSparkline = React.createClass({
  getStarArray: function (starNow, deltas) {
    let stars = [];
    let total = starNow;
    deltas.forEach(function (delta) {
      total = total + delta;
      stars.push(total);
    });
    return stars;
  },
  render: function() {
    const { starsNow, deltas } = this.props;
    const stars = this.getStarArray(starsNow, deltas.reverse());
    return (
      <div>
        <Sparklines data={ stars } width={ this.props.width }>
          <SparklinesLine color="#D53E4F" />
        </Sparklines>
      </div>
    );
  }

});

module.exports = StarSparkline;
