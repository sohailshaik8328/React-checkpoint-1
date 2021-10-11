
function Activity(props) {
    function getDays(m, y) {
        let daysInMonths = new Date(y, m, 0).getDate();
        let days = [];
        for(let i = 1 ; i <= daysInMonths ; i++) {
            days.push(i);
        }
        return days;
    }

    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
    
      let date = new Date();
      let month = date.getMonth();
      let year = date.getFullYear();
      let totalDays = getDays(month, year);
      let activities = props.activities;

      return (
          <>
            {
                activities.map((activity, i) => (
                    <section key={i}>
                        <div className="container">
                            <div className="flex justity_space_between activity">
                                <div className="month_div">
                                    <h2 className="activity_name">{activity.activityName}</h2>
                                    <h3 className="acitvity_month">{months[month]}</h3>
                                </div>
                                <div className="all_btns flex wrap">
                                    {
                                        totalDays.map((days, index) => (
                                            <div key={index}>
                                                <button  id={i} key={index} value={days} onClick={(event) => props.handleClick(event)} className={`btn ${!activity.activityDays.includes(String(days)) ? "" : "active"}`} >{days}</button>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="cross_div">
                                     <i className="fas fa-times-circle cross" id={i} onClick={(event) => props.handleDelete(event)}></i>
                                </div>
                            </div>
                        </div>
                    </section>
                ))
            }
          </>
      )
}

export default Activity;
