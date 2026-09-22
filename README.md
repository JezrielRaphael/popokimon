# Sia Pokédex Explorer

A full-stack web application that fetches real-time Pokémon data using PokeAPI.

## Features
- **Data Display:** Fetches and displays sprites, names, IDs, and types for Pokémon.
- **Interactive Search & Filter:** Filter Pokémon dynamically by name, ID, or primary type.
- **Loading & Error Handling:** Manages asynchronous loading states and empty search results cleanly.

## API Setup & Key Handling
- **API Used:** [PokeAPI](https://pokeapi.co/)
- **API Key:** PokeAPI is a public API that does **not** require an API key or authentication headers. Direct client-side `GET` requests were made without proxy restrictions or CORS errors.