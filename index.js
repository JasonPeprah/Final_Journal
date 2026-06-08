const supabaseUrl = "https://zqzrsenyysdrcdswzhyr.supabase.co";
const supabaseKey = "sb_publishable_7NGOISZtUwzb1WkSllbyRg_9KjesRjz"; 

const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const back = document.querySelector("#back");
const button = document.querySelector(".button");
const footerbox1 = document.querySelector(".footerbox1");
const footerbox2 = document.querySelector(".footerbox2");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const save = document.querySelector(".save");
const edit = document.querySelector(".edit");
const note = document.querySelector(".note");
const title = document.querySelector(".Header");
const comment = document.querySelector(".comment");

// Search Elements
const boxMonth = document.querySelector(".box_month");
const boxDate = document.querySelector(".box_date");
const boxYear = document.querySelector(".box_year");
const searchBtn = document.querySelector(".box3 button");
const resultsBtn = document.querySelector(".results");
const calendarIcon = document.querySelector(".bi-calendar-plus-fill");

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS
const year = today.getFullYear();
const currentDate = `${year}-${month}-${day}`; // Match Supabase YYYY-MM-DD using local time
const hour = today.getHours();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const displayDate = `${today.getDate()} ${monthNames[today.getMonth()]}, ${year}`;

const morningComments = [
    "Have a productive day ahead!",
    "Ready to learn something new today?",
    "Start the day with confidence.",
    "Small steps lead to big achievements.",
    "Today's a great day to make progress.",
    "Stay focused and keep moving forward.",
    "Every morning is a fresh opportunity.",
    "Make today count.",
    "Keep your goals in sight.",
    "A great day begins with a great mindset.",
    "Take on today's challenges with confidence.",
    "Success starts with showing up.",
    "Learn, grow, and improve today.",
    "Stay curious and keep exploring.",
    "Your future self will thank you.",
    "Begin the day with purpose.",
    "Keep building your skills.",
    "Progress beats perfection.",
    "Turn ideas into action today.",
    "You are capable of great things."
];

const afternoonComments = [
    "Keep the momentum going.",
    "You're making good progress.",
    "Stay focused on your goals.",
    "A little effort now goes a long way.",
    "The day is still full of opportunities.",
    "Keep learning and growing.",
    "You're closer to your goals than this morning.",
    "Stay consistent and keep moving.",
    "One task at a time.",
    "Keep up the great work.",
    "Success is built throughout the day.",
    "Take a moment to appreciate your progress.",
    "You've got this.",
    "Stay determined.",
    "Good work deserves continued effort.",
    "Keep pushing forward.",
    "Progress is happening even if it's small.",
    "Make the most of the afternoon.",
    "Stay productive and positive.",
    "Finish strong."
];

const eveningComments = [
    "Reflect on today's achievements.",
    "Great work making it through the day.",
    "Take pride in your progress.",
    "Wrap up the day with purpose.",
    "A productive evening starts now.",
    "There's still time to accomplish something meaningful.",
    "Keep learning at your own pace.",
    "End the day stronger than you started.",
    "Celebrate your small wins.",
    "Consistency creates results.",
    "Take a moment to recharge.",
    "Well done on today's effort.",
    "Review, learn, and improve.",
    "Growth happens every day.",
    "Stay motivated.",
    "Keep building your future.",
    "The day isn't over yet.",
    "Every effort counts.",
    "Finish today's goals with confidence.",
    "Make the evening count."
];

const nightComments = [
    "Rest well and recharge.",
    "Tomorrow is another opportunity.",
    "Take time to relax.",
    "You've earned some rest.",
    "Reflect on the day's progress.",
    "Good work today.",
    "Rest is part of growth.",
    "Prepare for tomorrow's success.",
    "Recharge your mind and body.",
    "Every day is a step forward.",
    "Take pride in what you've accomplished.",
    "The day may end, but progress continues.",
    "Rest fuels productivity.",
    "A fresh start awaits tomorrow.",
    "Unwind and relax.",
    "You did your best today.",
    "Get ready for new opportunities tomorrow.",
    "Sleep well and dream big.",
    "Tomorrow is another chance to improve.",
    "End the day with gratitude."
];

const dawnComments = [
    "A new day is beginning.",
    "Rise and shine.",
    "Welcome the possibilities ahead.",
    "The world is waking up.",
    "Start fresh and stay positive.",
    "A calm start leads to a productive day.",
    "Every sunrise brings opportunity.",
    "Make the most of this new beginning.",
    "Today is full of potential.",
    "Take the first step forward.",
    "New day, new opportunities.",
    "Start strong.",
    "Early effort brings great rewards.",
    "Embrace the fresh start.",
    "A peaceful beginning sets the tone.",
    "The day is yours to shape.",
    "Wake up and pursue your goals.",
    "Every morning begins with a choice.",
    "Build momentum from the start.",
    "Let's make today meaningful."
];

if (title && comment) {
    let greeting;
    let comments;

    if (hour >= 0 && hour < 5) {
        greeting = "Good night";
        comments = nightComments;
    }
    else if (hour < 7) {
        greeting = "Good dawn";
        comments = dawnComments;
    }
    else if (hour < 12) {
        greeting = "Good morning";
        comments = morningComments;
    }
    else if (hour < 17) {
        greeting = "Good afternoon";
        comments = afternoonComments;
    }
    else if (hour < 21) {
        greeting = "Good evening";
        comments = eveningComments;
    }
    else {
        greeting = "Good night";
        comments = nightComments;
    }

    title.textContent = greeting;

    const randomIndex = Math.floor(Math.random() * comments.length);
    comment.textContent = comments[randomIndex];
}

async function updateButtonText() {
        const { data, error } = await supabase
            .from("journal")
            .select("date, note")
            .order("created_at", { ascending: false })
            .limit(1);

        console.log("Current Date:", currentDate);
        console.log("Supabase Data:", data);

        if (error) {
            console.error(error);
            if (button) button.innerHTML = "Journal";
            return;
        }

        if (data.length > 0) {

            const lastDate = data[0].date;

            if (lastDate === currentDate) {
                if (button) button.innerHTML = displayDate;
                if (save) save.style.display = "none";
                if (note) {
                    note.contentEditable = false;
                    note.innerHTML = data[0].note || ""; // Populate existing note content
                }
                if (edit) edit.style.display = "inline-block";
            } else {
                if (button) button.innerHTML = "Journal";
                if (edit) edit.style.display = "none";
                if (note) note.contentEditable = true;
                if (save) save.style.display = "inline-block";
            }

        } else {
            if (button) button.innerHTML = "Journal";
            if (edit) edit.style.display = "none";
            if (note) note.contentEditable = true;
            if (save) save.style.display = "inline-block";
        }
    }

async function loadViewOnlyNote(date) {
    try {
        const { data, error } = await supabase
            .from("journal")
            .select("note")
            .eq("date", date)
            .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
            if (note) {
                note.innerHTML = data[0].note || "";
                note.contentEditable = false;
            }
        } else {
            if (note) {
                note.innerHTML = "No entry found for this date.";
                note.contentEditable = false;
            }
        }

        if (save) save.style.display = "none";
        if (edit) edit.style.display = "none";
    } catch (error) {
        console.error("Error loading note:", error);
    }
}

if (button) {
    button.addEventListener("click", () => {
        window.location.href = "notes.html";
    });

}

if (edit) {
    edit.addEventListener("click", () => {
        edit.style.display = "none";
        note.contentEditable = true;
        save.style.display = "inline-block";
    });
}

if (back) {
    back.addEventListener("click", () => {
    window.location.href = "index.html";
    }); 
}

//footer
if (footerbox2) {
    footerbox2.addEventListener("click", () => {
        // Only navigate if not already on search.html
        if (currentPage !== "search.html") {
            window.location.href = "search.html";
        }
    }); 
}
if (footerbox1) {
    footerbox1.addEventListener("click", () => {
        // Only navigate if not already on index.html
        if (currentPage !== "index.html") {
            window.location.href = "index.html";
        }
    }); 
}

if (save) {

    save.addEventListener("click", async () => {

        const editorContent = note.innerHTML;

        // Prevent saving completely empty entries
        if (!editorContent.trim()) {
            return alert("Note cannot be empty.");
        }

        // Temporarily disable the save button to prevent double-clicks
        save.style.pointerEvents = "none";
        const originalText = save.innerHTML;
        save.innerHTML = "Saving...";

        try {

                // Find latest entry for today
                const { data, error: selectError } = await supabase
                    .from("journal")
                    .select("id")
                    .eq("date", currentDate)
                    .order("created_at", { ascending: false })
                    .limit(1);

                if (selectError) throw selectError;

                if (data.length > 0) {

                    const { error: updateError } = await supabase
                        .from("journal")
                        .update({
                            note: editorContent
                        })
                        .eq("id", data[0].id);

                    if (updateError) throw updateError;
            } else {
                console.log("Saving date:", currentDate);

                const { error: insertError } = await supabase
                    .from("journal")
                    .insert([
                        {
                            note: editorContent,
                            date: currentDate
                        }
                    ]);

                if (insertError) throw insertError;
                }

                window.location.href = "index.html";

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            // Re-enable the button if an error occurred (so they can try again)
            save.style.pointerEvents = "auto";
            save.innerHTML = originalText;
        }

    });

}

// Search Functionality
if (calendarIcon) {
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.style.position = 'absolute';
    dateInput.style.visibility = 'hidden';
    calendarIcon.parentElement.appendChild(dateInput);

    calendarIcon.addEventListener('click', () => {
        try {
            dateInput.showPicker();
        } catch (e) {
            dateInput.click();
        }
    });

    dateInput.addEventListener('change', (e) => {
        const val = e.target.value; 
        if (val) {
            const [y, m, d] = val.split('-');
            if (boxYear) boxYear.value = y;
            if (boxMonth) boxMonth.value = m;
            if (boxDate) boxDate.value = d;
        }
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevents the page from reloading if the button is inside a <form>
        console.log("Search button clicked!");

        if (!boxMonth || !boxDate || !boxYear) {
            console.error("Missing input boxes. Check your .box_month, .box_date, or .box_year classes.");
            alert("Error: One or more date inputs are missing.");
            return;
        }

        const mVal = boxMonth.value || "";
        const dVal = boxDate.value || "";
        const yVal = boxYear.value || "";
        
        console.log(`Raw inputs - Month: ${mVal}, Date: ${dVal}, Year: ${yVal}`);

        if (!mVal || !dVal || !yVal) {
            alert("Please enter a valid complete date.");
            return;
        }

        const m = String(mVal).padStart(2, '0');
        const d = String(dVal).padStart(2, '0');
        const y = String(yVal);

        const searchDate = `${y}-${m}-${d}`;
        console.log(`Formatted Search Date: ${searchDate}`);
        
        if (resultsBtn) {
            resultsBtn.style.cssText = "display: block;";
            resultsBtn.innerHTML = "Searching...";
        } else {
            console.warn("resultsBtn (.results) is missing from HTML.");
        }

        try {
            console.log("Querying Supabase for date:", searchDate);
            const { data, error } = await supabase
                .from("journal")
                .select("date, note")
                .eq("date", searchDate)
                .limit(1);

            console.log("Supabase response:", data);

            if (error) throw error;

            if (data && data.length > 0) {
                console.log("Match found!");
                
                if (resultsBtn) {
                    const displaySearchDate = `${parseInt(d)} ${monthNames[parseInt(m) - 1]}, ${y}`;
                    resultsBtn.style.cssText = "display: block;";
                    resultsBtn.innerHTML = displaySearchDate;
                    resultsBtn.onclick = () => {
                        window.location.href = `notes.html?date=${searchDate}`;
                    };
                }
            } else {
                console.log("No match found.");
                if (resultsBtn) {
                    resultsBtn.style.cssText = "display: block;";
                    resultsBtn.innerHTML = "No Entry";
                    resultsBtn.onclick = null;
                }
            }
        } catch (error) {
            console.error("Search error:", error);
            if (resultsBtn) {
                resultsBtn.style.cssText = "display: block;";
                resultsBtn.innerHTML = "Error";
            }
        }
    });
}

// Auth Logic
const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");
const googleSignInBtn = document.getElementById("googleSignInBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (googleSignInBtn) {
    googleSignInBtn.addEventListener("click", async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) {
            console.error(error);
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout failed:", error.message);
            alert(error.message);
        } else {
            window.location.href = "index.html";
        }

    });
}

function updateUIForAuth(session) {
    console.log("Session:", session);

    if (session) {
        if (authSection) authSection.style.display = "none";
        if (appSection) appSection.style.display = "flex"; // Show main app
        
        const urlParams = new URLSearchParams(window.location.search);
        const viewDate = urlParams.get('date');
        
        if (currentPage === "notes.html" && viewDate) {
            loadViewOnlyNote(viewDate);
        } else {
            updateButtonText(); // Fetch text only once session is valid
        }
    } else {
        if (authSection) {
            authSection.style.display = "flex"; // Show sign in
            if (appSection) appSection.style.display = "none";
        } else if (currentPage !== "index.html") {
            // Redirect to index.html to sign in if on another page unauthenticated
            window.location.href = "index.html";
        }
    }
}

if (supabase) {
    supabase.auth.getSession().then(({ data: { session } }) => updateUIForAuth(session));
    supabase.auth.onAuthStateChange((_event, session) => updateUIForAuth(session));
}
