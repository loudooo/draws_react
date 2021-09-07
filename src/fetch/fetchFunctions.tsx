
const url = "http://www.lesminimoys.fr/presentation_dessins/PHP/";

export const getAllDrawingsByArtistId = async (artist_id: number) => {

  await fetch(url + 'getDrawingsByArtistId.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json; charset="utf-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      artist_id: artist_id
    })

  })
    .then((response) => response.json())
    .then(res => console.log("res", res))
    .catch(error => console.error(error))
}