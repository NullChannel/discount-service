/**
 * Created by talnax on 6/18/2017.
 */

// http://www.reactd3.org/docs/basic/
// https://github.com/esbullington/react-d3
// https://github.com/adeveloperdiary/react-d3-charts/tree/gh-pages/02_Admin_Dashboard/part2/lib/charts
// https://github.com/emeeks/d3_in_action_2/tree/master/chapter9/reactd3/src
// https://noahehall.github.io/reactjs-d3-universal/

// LAST : http://eng.wealthfront.com/2017/02/14/integrating-d3-into-react/
// http://formidable.com/open-source/victory/
// https://macwright.org/2016/10/11/d3-and-react.html

import React, { Component }   from 'react';
import  * as d3               from 'd3';    // https://github.com/d3/d3
import Common, { SourceMode } from '../../Common/Common';

import './../../styles/GraphEntries.css';

class GraphEntries extends Component {

    constructor(props) {
        super(props);

        this.state = {};

       this.colors = [];

        this.common = new Common();

        // const dataMax = max(this.props.data.map(d => sum(d.data)))
    }

   setUserToasterClicks() {

       let data = this.props.d3Data;
       let allClicks = data.values[0] + data.values[1] + data.values[2]  + data.values[3];
       let elk = document.getElementById('user-actions-clicks');
       elk.innerText = `${allClicks} - User Clicks`;
       //elk.style.color = this.colors[0];

      let els = document.getElementById('user-actions-settings');
      els.innerText = `${this.props.d3Data.values[0]} - Settings`;
      els.style.color = this.colors[0];

      let elc = document.getElementById('user-actions-cancel');
      elc.innerText = `${this.props.d3Data.values[1]} - Cancel`;
      elc.style.color = this.colors[1];

      let elb = document.getElementById('user-actions-buys')
      elb.innerText = `${this.props.d3Data.values[2]} - Buys`;
      elb.style.color = this.colors[2];

       let eli = document.getElementById('user-actions-ignores')
       eli.innerText = `${this.props.d3Data.values[3]} - Ignores`;
       eli.style.color = this.colors[3];
   }

    componentDidMount() {
        this.createDonuts();
       this.setUserToasterClicks();
        //this.createDonuts2();
    }

    componentDidUpdate() {
        this.createDonuts();
       this.setUserToasterClicks();
        //this.createDonuts2();
    }

    createDonuts() {
        // http://jsfiddle.net/gregfedorov/Qh9X5/9/
        // You can find all the new syntax for v3 => v4 here :
        // https://github.com/d3/d3/blob/master/CHANGES.md
        // https://amdevblog.wordpress.com/2016/07/20/update-d3-js-scripts-from-v3-to-v4/

        //let dataset = {
        //    action: ['settings', 'cancel', 'buys'],
        //    values: ['12', '18', '36']
        //};

       this.colors = [];
       let own = this;

        let dataset = this.props.d3Data;

        var width = 460,
            height = 360,
            radius = Math.min(width, height) / 2;

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var pie = d3.pie()
            .sort(null);

        var arc = d3.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 30);

        var svg = d3.select("#id-graph-entries").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // functions

        var g = svg.selectAll(".arc")
                .data(pie(dataset.values))
                .enter().append("g")

        g.append("path")
            .attr("fill", function(d, i) {
                let clr = color(i);
                console.log('d,i,color', d,i,clr);
                own.colors.push(clr);
                return clr;
            })
            .attr("d", arc);

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text( function(d, i) { return dataset.actions[i]; })
    }

    createDonuts2() {

        // https://bl.ocks.org/mbostock/3887193
        // http://jsfiddle.net/gregfedorov/Qh9X5/9/

        var dataset = {
            apples: [53245, 28479, 19697, 24037, 40245]
        };

        var width = 460,
            height = 300,
            radius = Math.min(width, height) / 2;

        //var color = d3.scale.category20();
        var color =d3.scaleOrdinal(d3.schemeCategory20);

        var pie = d3.pie()
            .sort(null);

        var arc = d3.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 50);

        var svg = d3.select("#id-graph-entries").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var path = svg.selectAll("path")
            .data(pie(dataset.apples))
            .enter().append("path")
            .attr("fill", function(d, i) { return color(i); })
            .attr("d", arc);
    }

    render() {

        //return <svg ref={node => this.node = node}
        //            width={500} height={500}>
        //</svg>

        //<div id="id-graph-entries" className="graph-entries">
        //    <svg ref={node => this.node = node}
        //         width={this.props.d3Size.width}
        //         height={this.props.d3Size.height}>
        //    </svg>
        //</div>

        return (

            <div id="id-graph-entries" className="graph-entries">

               <div className="graph-user-actions">
                  <div className="user-actions-title" id="user-actions-clicks">User Clicks:</div>
                  <div className="user-actions-value" id="user-actions-settings">Settings</div>
                  <div className="user-actions-value" id="user-actions-cancel">Cancel</div>
                  <div className="user-actions-value" id="user-actions-buys">Buys</div>
                   <div className="user-actions-value" id="user-actions-ignores">Ignores</div>
               </div>
            </div>

        );
    }
}

export default GraphEntries;
