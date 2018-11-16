export const dataset =
    {
        bar: {
            name: "",
            data: [],
            color: '#28B9D6',
        },
        default: {
            name: "",
            data: [],
            color: '#93BDDA',
        }

    }
    ;


export const chartData = {
    bar: {
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            type: 'column',
            height: 180,
            margin: [0, 10, 30, 5],
            events: {
                redraw: function () {

                }
            }
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        colorAxis: {
            labels: {
                enabled: false
            }
        },
        legend: {
            enabled: false
        },
        xAxis: {
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            labels: {
              enabled: true,
              style: {
                color: 'white'
              }
            },
            minorTickLength: 0,
            tickLength: 0,
            categories: []
          },
        yAxis: {
            // plotLines: [{
            //   color: '#f7c0c0', // Color value
            //   dashStyle: 'solid', // Style of the plot line. Default to solid
            //   value: 8, // Value of where the line will appear
            //   width: 1 // Width of the line    
            // }],
            min: -.1,
            startOnTick: false,
            gridLineWidth: 0,
            labels: {
                enabled: false
            },
            title: {
                text: null
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    inside: false,
                    crop: false,
                    overflow: "none",
                    style: {
                        color: '#FFFFFF',
                        fontSize: "10px",
                        fontWeight: 'bold',
                        textOutline: '0px',
                    }
                },
                borderColor: '#303030',
                borderRadius: 7
            },
            column: {
                pointPadding: 0.025,
                borderWidth: 1,
                /* Here is the setting to limit the maximum column width. */
                maxPointWidth: 20
            }
        },
        series: [
            this.dataset
        ],
        responsive: [{
            rules: [{

                chartOptions: {
                    /**
                     * When using multiple axis, the ticks of two or more opposite axes will automatically be aligned by adding ticks to
                     * the axis or axes with the least ticks. This can be prevented by setting alignTicks to false. If the grid lines
                     * look messy, it's a good idea to hide them for the secondary axis by setting gridLineWidth to 0.
                     * @default true
                     */
                    // alignTicks: boolean;
                    /**
                     * Set the overall animation for all chart updating. Animation can be disabled throughout the chart by setting it to
                     * false here. It can be overridden for each individual API method as a function parameter. The only animation not
                     * affected by this option is the initial series animation, see plotOptions.series.animation.
                     *
                     * The animation can either be set as a boolean or a configuration object. If true, it will use the 'swing' jQuery
                     * easing and a duration of 500 ms.
                     *
                     * @default true
                     */
                    // animation?: boolean | Animation;
                    /**
                     * The background color or gradient for the outer chart area.
                     * @default '#FFFFFF'
                     */
                    // backgroundColor?: string | Gradient;
                    /**
                     * The color of the outer chart border.
                     * @default '#4572A7'
                     */
                    // borderColor?: string | Gradient;
                    /**
                     * The corner radius of the outer chart border.
                     * @default 0
                     */
                    // borderRadius?: number;
                    /**
                     * The pixel width of the outer chart border.
                     * @default 0
                     */
                    // borderWidth?: number;
                    /**
                     * A CSS class name to apply to the charts container div, allowing unique CSS styling for each chart.
                     */
                    // className?: string;
                    /**
                     * In styled mode, this sets how many colors the class names should rotate between. With ten colors,
                     * series (or points) are given class names like highcharts-color-0, highcharts-color-0 [...] highcharts-color-9.
                     * The equivalent in non-styled mode is to set colors using the colors setting.
                     * @since 5.0.0
                     * @default 10
                     */
                    // colorCount?: number;
                    /**
                     * Alias of type. Defaults to line.
                     * @default 'line'
                     * @deprecated
                     */
                    // defaultSeriesType?: string;
                    // description?: string;
                    /**
                     * Event listeners for the chart.
                     */
                    // events?: ChartEvents;
                    /**
                     * An explicit height for the chart. If a number, the height is given in pixels. If given a percentage string (for example '56%'),
                     * the height is given as the percentage of the actual chart width. This allows for preserving the aspect ratio across responsive sizes.
                     * By default (when null) the height is calculated from the offset height of the containing element, or 400 pixels if the containing element's height is 0.
                     * @default null
                     * @since 5.0.8
                     */
                    // height?: number | string;
                    /**
                     * If true, the axes will scale to the remaining visible series once one series is hidden. If false, hiding and
                     * showing a series will not affect the axes or the other series. For stacks, once one series within the stack is
                     * hidden, the rest of the stack will close in around it even if the axis is not affected.
                     * @default true
                     * @since 1.2.0
                     */
                    // ignoreHiddenSeries?: boolean;
                    /**
                     * Whether to invert the axes so that the x axis is vertical and y axis is horizontal. When true, the x axis is
                     * reversed by default. If a bar series is present in the chart, it will be inverted automatically.
                     * @default false
                     */
                    // inverted?: boolean;
                    /**
                     * The margin between the outer edge of the chart and the plot area. The numbers in the array designate top, right,
                     * bottom and left respectively. Use the options marginTop, marginRight, marginBottom and marginLeft for shorthand
                     * setting of one option.
                     *
                     * Since version 2.1, the margin is 0 by default. The actual space is dynamically calculated from the offset of axis
                     * labels, axis title, title, subtitle and legend in addition to the spacingTop, spacingRight, spacingBottom and
                     * spacingLeft options.
                     */
                    // margin?: number | number[];
                    /**
                     * The margin between the bottom outer edge of the chart and the plot area. Use this to set a fixed pixel value for
                     * the margin as opposed to the default dynamic margin. See also spacingBottom.
                     * @since 2.0
                     */
                    // marginBottom?: number;
                    /**
                     * The margin between the left outer edge of the chart and the plot area. Use this to set a fixed pixel value for
                     * the margin as opposed to the default dynamic margin. See also spacingLeft.
                     * @since 2.0
                     */
                    // marginLeft?: number;
                    /**
                     * The margin between the right outer edge of the chart and the plot area. Use this to set a fixed pixel value for
                     * the margin as opposed to the default dynamic margin. See also spacingRight.
                     * @since 2.0
                     */
                    // marginRight?: number;
                    /**
                     * The margin between the top outer edge of the chart and the plot area. Use this to set a fixed pixel value for the
                     * margin as opposed to the default dynamic margin. See also spacingTop.
                     * @since 2.0
                     */
                    // marginTop?: number;
                    /**
                     * Options to render charts in 3 dimensions. This feature requires highcharts-3d.js, found in the download package
                     * or online at {@link code.highcharts.com/highcharts-3d.js}.
                     */
                    // options3d?: ChartOptions3d;
                    /**
                     * Allows setting a key to switch between zooming and panning.
                     * @since 4.0.3
                     */
                    // panKey?: string;
                    /**
                     * Allow panning in a chart. Best used with panKey to combine zooming and panning.
                     * @default false
                     * @since 4.0.3
                     */
                    // panning?: boolean;
                    /**
                     * Equivalent to zoomType, but for multitouch gestures only. By default, the pinchType is the same as the zoomType
                     * setting. However, pinching can be enabled separately in some cases, for example in stock charts where a mouse
                     * drag pans the chart, while pinching is enabled.
                     * @default null
                     * @since 3.0
                     */
                    // pinchType?: string;
                    /**
                     * The background color or gradient for the plot area.
                     */
                    // plotBackgroundColor?: string | Gradient;
                    /**
                     * The URL for an image to use as the plot background. To set an image as the background for the entire chart, set a
                     * CSS background image to the container element. Note that for the image to be applied to exported charts, its URL
                     * needs to be accessible by the export server.
                     */
                    // plotBackgroundImage?: string;
                    /**
                     * The color of the inner chart or plot area border.
                     * @default 0
                     */
                    // plotBorderColor?: string;
                    /**
                     * The pixel width of the plot area border.
                     * @default 0
                     */
                    // plotBorderWidth?: number;
                    /**
                     * Whether to apply a drop shadow to the plot area. Requires that plotBackgroundColor be set. Since 2.3 the shadow
                     * can be an object configuration containing color, offsetX, offsetY, opacity and width.
                     * @default false
                     */
                    // plotShadow?: boolean | Shadow;
                    /**
                     * When true, cartesian charts like line, spline, area and column are transformed into the polar coordinate system.
                     * Requires highcharts-more.js.
                     * @default false
                     * @since 2.3.0
                     */
                    // polar?: boolean;
                    /**
                     * Whether to reflow the chart to fit the width of the container div on resizing the window.
                     * @default true
                     * @since 2.1
                     */
                    reflow: true,
                    /**
                     * The HTML element where the chart will be rendered. If it is a string, the element by that id is used. The HTML
                     * element can also be passed by direct reference.
                     */
                    // renderTo?: string | HTMLElement;
                    /**
                     * The button that appears after a selection zoom, allowing the user to reset zoom.
                     */
                    // resetZoomButton?: ChartResetZoomButton;
                    /**
                     * The background color of the marker square when selecting (zooming in on) an area of the chart.
                     * @default 'rgba(69,114,167,0.25)'
                     * @since 2.1.7
                     */
                    // selectionMarkerFill?: string;
                    /**
                     * Whether to apply a drop shadow to the outer chart area. Requires that backgroundColor be set. Since 2.3 the
                     * shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                     * @default false
                     */
                    // shadow?: boolean | Shadow;
                    /**
                     * Whether to show the axes initially. This only applies to empty charts where series are added dynamically, as axes
                     * are automatically added to cartesian series.
                     * @default false
                     * @since 1.2.5
                     */
                    // showAxes?: boolean;
                    /**
                     * The distance between the outer edge of the chart and the content, like title, legend, axis title or labels. The
                     * numbers in the array designate top, right, bottom and left respectively. Use the options spacingTop,
                     * spacingRight, spacingBottom and spacingLeft options for shorthand setting of one option.
                     * @default [10, 10, 15, 10]
                     * @since 3.0.6
                     */
                    // spacing?: number[];
                    /**
                     * The space between the bottom edge of the chart and the content (plot area, axis title and labels, title, subtitle
                     * or legend in top position).
                     * @default 15
                     * @since 2.1
                     */
                    // spacingBottom?: number;
                    /**
                     * The space between the left edge of the chart and the content (plot area, axis title and labels, title, subtitle
                     * or legend in top position).
                     * @default 10
                     * @since 2.1
                     */
                    // spacingLeft?: number;
                    /**
                     * The space between the right edge of the chart and the content (plot area, axis title and labels, title, subtitle
                     * or legend in top position).
                     * @default 10
                     * @since 2.1
                     */
                    // spacingRight?: number;
                    /**
                     * The space between the top edge of the chart and the content (plot area, axis title and labels, title, subtitle or
                     * legend in top position).
                     * @default 10
                     * @since 2.1
                     */
                    // spacingTop?: number;
                    /**
                     * Additional CSS styles to apply inline to the container div. Note that since the default font styles are applied
                     * in the renderer, it is ignorant of the individual chart options and must be set globally.
                     */
                    // style?: CSSObject;
                    /**
                     * The default series type for the chart. Can be any of the chart types listed under plotOptions.
                     * @default 'line'
                     * @since 2.1.0
                     */
                    // type?: string;
                    /**
                     * A text description of the chart type.
                     * If the Accessibility module is loaded, this will be included in the description of the chart in the screen reader information region.
                     * Highcharts will by default attempt to guess the chart type, but for more complex charts it is recommended to specify this property for clarity.
                     * @since 5.0.0
                     * @default undefined
                     */
                    // typeDescription?: string;
                    /**
                     * An explicit width for the chart. By default the width is calculated from the offset width of the containing
                     * element.
                     */
                    // width?: number;
                    /**
                     * Decides in what dimensions the user can zoom by dragging the mouse. Can be one of x, y or xy.
                     */
                    // zoomType?: string;
                },
                condition: {
                    /**
                     * A callback function to gain complete control on when the responsive rule applies. Return true if it applies.
                     * This opens for checking against other metrics than the chart size, or example the document size or other elements.
                     * The this keyword refers to the Chart object.
                     * @since 5.0.0
                     */
                    // call back?: Function;

                    /**
                     * The responsive rule applies if the chart height is less than this.
                     * @since 5.0.0
                     */
                    // maxHeight?: number;

                    /**
                     * The responsive rule applies if the chart height is less than this.
                     * @since 5.0.0
                     */
                    // maxWidth?: number;

                    /**
                     * The responsive rule applies if the chart height is greater than this.
                     * @since 5.0.0
                     * @default 0
                     */
                    // minHeight?: number;

                    /**
                     * The responsive rule applies if the chart width is greater than this.
                     * @since 5.0.0
                     * @default 0
                     */
                    // minWidth?: number;
                }
            }]
        }]
    },
    default: {
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            type: 'line',
            height: 135,

        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        colorAxis: {
            labels: {
                enabled: false
            }
        },
        legend: {
            enabled: false
        },
        xAxis: {
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            labels: {
                enabled: true,
                style: {
                    color: 'white'
                }
            },
            minorTickLength: 0,
            tickLength: 0,
            categories: []
        },
        yAxis: {
            gridLineWidth: 0,
            labels: {
                enabled: false
            },
            title: {
                text: null
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    style: {
                        color: '#93BDDA',
                        fontSize: "10px",
                        fontWeight: 'bold',
                        textOutline: '0px',
                    }
                }
            },
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false,
                label: {
                    style: {
                        fontWeight: 'normal'
                    }
                },
                marker: {
                    fillColor: '#27BAE5',
                    lineColor: '#000000',
                    lineWidth: 1
                }
            }
        },
        series: [
            {
                name: "",
                data: [],
                color: '#93BDDA',
            }
        ]
    }
};
let orange = '#65CFCD';
let label_text = '#CCCCCC';
let highway = '#1B4A57';
let subway = '#236577';
let water = '#10242d';

export const AGMStyle = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: label_text}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: orange}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: label_text}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: subway}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: highway}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#c4fbfa'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: label_text}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: water}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ];