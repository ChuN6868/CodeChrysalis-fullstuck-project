exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('messages').del()
  await knex('messages').insert([{ content: 'Content 1' }, { content: 'Content 2' }, { content: 'Content 3' }])
};
