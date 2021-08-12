import "./Ticket.css"
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
                    <div className="subtitle">{`${segments[0].origin} - ${segments[0].destination}`}</div>
                    <div className="info">{getStartEnd(segments[0].date, +segments[0].duration)}</div>
  
                </div>
                <div className="length">
                    <div className="subtitle">В ПУТИ</div>
                    <div className="info">{getDuration(+segments[0].duration)}</div>
                </div>
                <div className="stops">
                    <div className="subtitle">{getStopsTitle(segments[0].stops)}</div>
                    <div className="info">{segments[0].stops.join(", ")}</div>
                </div>
            </div>
            <div className="second-segment">
                <div className="route">
                    <div className="subtitle">{`${segments[1].origin} - ${segments[1].destination}`}</div>
                    <div className="info">{getStartEnd(segments[1].date, +segments[1].duration)}</div>
                </div>
                <div className="length">
                    <div className="subtitle">В ПУТИ</div>
                    <div className="info">{getDuration(+segments[1].duration)}</div>
                </div>
                <div className="stops">
                    <div className="subtitle">{getStopsTitle(segments[1].stops)}</div>
                    <div className="info">{segments[1].stops.join(", ")}</div>
                </div>
            </div>
        </div>)
}