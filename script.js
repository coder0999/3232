document.addEventListener('DOMContentLoaded', () => {
    const prayerTimesTableBody = document.querySelector('#prayer-times-table tbody');
    const serverUptimeElement = document.getElementById('server-uptime');

    // Function to fetch prayer times and populate the table
    async function getPrayerTimes() {
        try {
            // This URL will point to our Flask server.
            // IMPORTANT: Update this URL to your deployed backend server's address when deploying.
            const response = await fetch('http://localhost:8080/api/prayer-times');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const prayerTimes = await response.json();

            // Clear existing rows
            prayerTimesTableBody.innerHTML = '';

            // Populate table with new data
            for (const [prayer, time] of Object.entries(prayerTimes)) {
                const row = document.createElement('tr');
                const prayerCell = document.createElement('td');
                const timeCell = document.createElement('td');

                prayerCell.textContent = prayer;
                timeCell.textContent = time;

                row.appendChild(prayerCell);
                row.appendChild(timeCell);
                prayerTimesTableBody.appendChild(row);
            }
        } catch (error) {
            console.error("Failed to fetch prayer times:", error);
            prayerTimesTableBody.innerHTML = '<tr><td colspan="2">Error loading prayer times.</td></tr>';
        }
    }

    // Function to fetch and display server uptime
    async function getServerUptime() {
        try {
            // This URL will point to our Flask server.
            // IMPORTANT: Update this URL to your deployed backend server's address when deploying.
            const response = await fetch('http://localhost:8080/api/uptime');
             if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            serverUptimeElement.textContent = data.uptime;
        } catch (error) {
            console.error("Failed to fetch server uptime:", error);
            serverUptimeElement.textContent = "Unavailable";
        }
    }

    // Initial data fetch
    getPrayerTimes();
    getServerUptime();

    // Refresh uptime every 5 seconds
    setInterval(getServerUptime, 5000);
});
