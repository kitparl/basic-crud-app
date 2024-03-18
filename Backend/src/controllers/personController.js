import { pool } from "../db.js";

export const getPersons = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM person");
    res.json({ persons: rows });
  } catch (error) {
    if(error.sqlMessage){
      res.status(500).json({ error: error.sqlMessage });
    }else{
      console.error("Error updating person:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const createPerson = async (req, res) => {
  try {
    const newPerson = req.body;
    await pool.query("INSERT INTO person SET ?", [newPerson]);
    res.status(201).json({ message: "Person created successfully" });
  } catch (error) {
    if(error.sqlMessage){
      res.status(500).json({ error: error.sqlMessage });
    }else{
      console.error("Error updating person:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const newPerson = req.body;
  
    if (!newPerson || Object.keys(newPerson).length === 0) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    await pool.query("UPDATE person SET ? WHERE id = ?", [newPerson, id]);

    res.json({ message: "Person updated successfully" });
  } catch (error) {
    if(error.sqlMessage){
      res.status(500).json({ error: error.sqlMessage });
    }else{
      console.error("Error updating person:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM person WHERE id = ?", [id]);

    if (result && result[0] && result[0].affectedRows === 1) {
      res.json({ message: "Person deleted successfully" });
    } else {
      console.log("No person found with ID:", id);
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    if(error.sqlMessage){
      res.status(500).json({ error: error.sqlMessage });
    }else{
      console.error("Error updating person:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

