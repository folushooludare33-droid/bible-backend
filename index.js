import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const app = express();
app.use(cors());
app.use(express.json());

// SETTINGS
app.get("/api/settings", (req, res) => {
  res.json({
    registration_open: true,
    whatsapp_link: "https://chat.whatsapp.com/your-link",
    edition_name: "Bible Retreat 26",
    theme_title: "The Grace",
    event_date: "2026"
  });
});

// REGISTER (dummy version)
app.post("/api/register", async (req, res) => {
  res.json({
    success: true,
    token: "demo-token-123"
  });
});

// CONTENT
app.get("/api/content", (req, res) => {
  res.json({
    sessions: [
      {
        id: 1,
        title: "Session 1",
        description: "Introduction",
        audio_url: ""
      }
    ]
  });
});
app.get("/", (req, res) => {
  res.send("Bible Retreat Backend Working");
});

app.get("/api/admin/registrations", async (req, res) => {
  const { data, error } = await supabase
    .from("registrations")
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000");
});