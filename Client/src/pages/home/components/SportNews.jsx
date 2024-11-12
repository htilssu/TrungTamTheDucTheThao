import {useQuery} from "@tanstack/react-query";

function SportNews() {

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const response = await fetch("https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=4328");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        },
        staleTime: 1000 * 60 * 25,
        cacheTime: 1000 * 60 * 25,
    });

    return (
        <div className={"container mx-auto px-4 text-center"}>
            <div className="bg-gradient-to-r from-gray-900 to-cyan-700 min-h-screen p-6 text-white rounded-xl">
                <h1 className="text-3xl font-bold text-center mb-10">Tin Tức Thể Thao Thế Giới</h1>
                {isLoading ? (
                    <p className="text-gray-300 text-center">Loading events...</p>
                ) : isError ? (
                    <p className="text-red-500 text-center">{`Error: ${error.message}`}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.events.map(event => (
                            <EventCard key={event.idEvent} event={event}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function EventCard({event}) {
    return (
        <div
            className="bg-white shadow-lg rounded-lg p-4 mb-6 max-w-md mx-auto transition-transform transform hover:scale-105">
            <img src={event.strThumb || "https://via.placeholder.com/400x200"} alt={event.strEvent}
                 className="rounded-lg w-full mb-4"/>
            <div className="flex items-center mb-4">
                <img src={event.strLeagueBadge || "https://via.placeholder.com/20"} alt={event.strLeague}
                     className="w-8 h-8 mr-2"/>
                <h2 className="text-xl font-semibold">{event.strEvent}</h2>
            </div>
            <p className="text-gray-600 text-sm">{event.strSport} - {event.strSeason}</p>
            <p className="text-gray-600 text-sm">Round: {event.intRound}</p>
            <div className="flex justify-between items-center mt-4">
                <div className="text-center">
                    <img src={event.strHomeTeamBadge || "https://via.placeholder.com/40"} alt={event.strHomeTeam} className="w-12 h-12 mx-auto" />
                    <p className="font-semibold">{event.strHomeTeam}</p>
                    <p className="text-lg font-bold">{event.intHomeScore}</p>
                </div>
                <span className="text-xl font-bold">VS</span>
                <div className="text-center">
                    <img src={event.strAwayTeamBadge || "https://via.placeholder.com/40"} alt={event.strAwayTeam} className="w-12 h-12 mx-auto" />
                    <p className="font-semibold">{event.strAwayTeam}</p>
                    <p className="text-lg font-bold">{event.intAwayScore}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-gray-500 text-sm">Date: {event.dateEvent} at {event.strTime}</p>
                <p className="text-gray-500 text-sm">Location: {event.strVenue} - {event.strCountry}</p>
                {event.intSpectators && <p className="text-gray-500 text-sm">Spectators: {event.intSpectators}</p>}
                {event.strDescriptionEN && <p className="text-gray-500 text-sm mt-2">{event.strDescriptionEN}</p>}
                <p className={`mt-2 text-sm font-semibold ${event.strStatus === "Match Finished" ? "text-green-500" : "text-yellow-500"}`}>
                    Status: {event.strStatus}
                </p>
                {event.strPostponed === "yes" && <p className="text-red-500 text-sm">Postponed</p>}
            </div>
        </div>
    );
}

export default SportNews;
