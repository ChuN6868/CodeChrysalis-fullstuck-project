/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('seats').del()
  await knex('seats').insert([
    {seat_number: 1},
    {seat_number: 2},
    {seat_number: 3},
    {seat_number: 4},
    {seat_number: 5},
    {seat_number: 6}
  ]);
};
