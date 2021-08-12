export const Ticket = (props) => {
    const { price, carrier, segments } = props.data;
    const { getDuration, getStartEnd, getStopsTitle } = props;
    return (
        <div className="ticket">
            <div className="ticket-head">
                <div className="price">{price + " P"}</div>
                <img className="logo" alt="logo" src={"http://pics.avs.io/99/36/"+carrier+".png"}/>
            </div>
            <div className="first-segment">
                <div className="route">
                    <div>{`${segments[0].origin} - ${segments[0].destination}`}</div>
                    <div>{getStartEnd(segments[0].date, +segments[0].duration)}</div>
  
                </div>
                <div className="length">
                    <div>В ПУТИ</div>
                    <div>{getDuration(+segments[0].duration)}</div>
                </div>
                <div className="stops">
                    <div>{getStopsTitle(segments[0].stops)}</div>
                    <div>{segments[0].stops.join(", ")}</div>
                </div>
            </div>
            <div className="second-segment">
                <div className="route">
                    <div>{`${segments[1].origin} - ${segments[1].destination}`}</div>
                    <div>{getStartEnd(segments[1].date, +segments[1].duration)}</div>
                </div>
                <div className="length">
                    <div>В ПУТИ</div>
                    <div>{getDuration(+segments[1].duration)}</div>
                </div>
                <div className="stops">
                    <div>{getStopsTitle(segments[1].stops)}</div>
                    <div>{segments[1].stops.join(", ")}</div>
                </div>
            </div>
        </div>)
}