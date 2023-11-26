import { useEffect, useState, TouchEvent, MouseEvent } from "react";
import LocationsModel from "../../../Models/LocationModel";
import FollowerModel from "../../../Models/FollowerModel";
import UserModel from "../../../Models/UserModel";
import useMeasure from "react-use-measure";
import {defaultStyles,useTooltip,TooltipWithBounds} from "@visx/tooltip";
import { scaleBand, scaleLinear } from "@visx/scale";
import {AxisLeft, AxisBottom} from "@visx/axis";
import {localPoint} from "@visx/event";
import {Group} from "@visx/group";
import  {Bar} from "@visx/shape";

        
interface BarChartProps {
  location:LocationsModel[];
  allFollower:FollowerModel[];
  eachFollower:FollowerModel[];
  users:UserModel[];
}
        
const margin = 32;
const defaultWidth = 100;
const defaultHeight = 100;
const toollipStyles ={
  ...defaultStyles,
  borderRadius: 4,
  background: "black",
  color: "white",
}
        
function BarChart(props:BarChartProps): JSX.Element {
  const [thePointX, setThePointX] = useState<number>()
  const [thePointY, setThePointY] = useState<number>()
  const[ref, bounds] = useMeasure()
  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultHeight;
  const innerWibth = width - margin;
  const innerHeight = height - margin;
  const get2XValue = (l:FollowerModel)=>l.locationId;
  const getYValue = (props.allFollower)
  const get3YValue = (f:FollowerModel)=>f.userId;
  const get5YValue = (l:FollowerModel)=>l.userId;
  const getYValue2:number[] = []
  const getYValueForyScale = props.location.map((l)=>l.locationName)
  const getPropsFromFollower = props.allFollower
  const getPropsFromLocation = props.location
  const amountOfUsers = props.users.length
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
  } = useTooltip<FollowerModel>();

  const xScale = scaleBand<string>({
    range: [margin,innerWibth],
    domain: getYValueForyScale,
    padding: 0.13
  });

  const yScale = scaleLinear<number>({
    range: [innerHeight,margin],
    domain:[ 
      Math.min(...getPropsFromFollower.map(get3YValue))-1,
      amountOfUsers-1,
    ],
    
  });
  useEffect(() =>{
    getYValue.forEach((f)=>{getYValue2.push(f.userId)});
  });
                                            
  return(
    <>
      <svg
        ref={ref} 
        width="60%" 
        height={600} 
        viewBox={`0 0 ${width} ${height}`}>

        <Group>{getPropsFromFollower.map((f)=>{
          const result = getPropsFromLocation.find((l) => l.locationId === f.locationId) 
          const xValue = get2XValue(f);
          const barWidth = xScale.bandwidth();
          const barHeight = innerHeight - (yScale(get3YValue(f)) ?? 0);
          const barX = xScale(result.locationName);
          const barY = innerHeight - barHeight;        

          return(      
            <Bar key={`bar-${xValue}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="LightBlue"
              onMouseMove={(event:TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>)=>{
                const point = localPoint(event);
                if(!point) return;
                showTooltip({
                  tooltipData: f,
                  tooltipLeft: point.x,
                  tooltipTop: point.y,
                });
                setThePointX(point.x)
                setThePointY(point.y)       
              }}
              onMouseLeave={()=>hideTooltip()}
            />)
          })};
        </Group>
        <Group>
          <AxisBottom top={innerHeight} scale={xScale}/>
        </Group>
        <Group>
          <AxisLeft left={margin} tickLength={yScale.length} scale={yScale}/>
        </Group>
      </svg>
      {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={thePointY+300}
          left={thePointX + 400}
          style={toollipStyles}
        >
          <b>Followers</b> :{get5YValue(tooltipData)}
        </TooltipWithBounds>
      ):null}
    </>
  );
}

export default BarChart;
