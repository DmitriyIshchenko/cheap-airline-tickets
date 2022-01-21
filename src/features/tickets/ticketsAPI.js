export const fetchTicketsAsync = async () => {
    const searchId = await fetch("https://front-test.beta.aviasales.ru/search")
        .then(response => response.json()).then(data => data.searchId);
    return fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
        .then(response => response.json()).then(data => data.tickets);
}