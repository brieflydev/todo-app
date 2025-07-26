"use client";
import React, { useEffect, useState } from "react";
import api from "./api";
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LoginPage from "./login/page";

interface Todo {
  id: string;
  name: string;
  completed: boolean;
  userId: string;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get<Todo[]>("/todos");
      setTodos(res.data);
    } catch (e) {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('token'));
      setCheckedAuth(true);
      const handleStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTodos();
    }
  }, [isLoggedIn]);

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await api.post<Todo>("/todos", { name: newTodo });
      setTodos((prev) => [...prev, res.data]);
      setNewTodo("");
    } catch (e) {
      // handle error
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      // handle error
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const res = await api.patch<Todo>(`/todos/${todo.id}`, {
        completed: !todo.completed,
      });
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, completed: res.data.completed } : t))
      );
    } catch (e) {
      // handle error
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingName(todo.name);
  };

  const handleEditSave = async (id: string) => {
    try {
      const res = await api.patch<Todo>(`/todos/${id}`, { name: editingName });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, name: res.data.name } : t))
      );
      setEditingId(null);
      setEditingName("");
    } catch (e) {
      // handle error
    }
  };

  if (!checkedAuth) return null;
  if (!isLoggedIn) return <LoginPage />;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Todos
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAdd} disabled={!newTodo.trim()}>
          Add
        </Button>
      </Box>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} divider>
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />
            {editingId === todo.id ? (
              <TextField
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => handleEditSave(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditSave(todo.id);
                }}
                autoFocus
                size="small"
                sx={{ mr: 2 }}
              />
            ) : (
              <ListItemText
                primary={todo.name}
                onClick={() => handleEdit(todo)}
                sx={{ cursor: "pointer" }}
              />
            )}
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
