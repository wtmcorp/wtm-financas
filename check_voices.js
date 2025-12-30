const ELEVENLABS_API_KEY = "sk_259c1a64b5f7c59c5d6f4b7f27a28a30f8545c35d149ab1e";

async function checkVoices() {
    try {
        const response = await fetch("https://api.elevenlabs.io/v1/voices", {
            headers: {
                "xi-api-key": ELEVENLABS_API_KEY
            }
        });
        const data = await response.json();
        console.log("Available Voices:");
        data.voices.forEach(v => {
            console.log(`${v.name} (${v.labels.gender}): ${v.voice_id}`);
        });
    } catch (error) {
        console.error("Error fetching voices:", error);
    }
}

checkVoices();
