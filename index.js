require('dotenv').config();
let program = require('commander');
let Axios = require('axios');

// search gitlab command
program
  .command('search')
  .option('-s --search <string> Search parameter')
  .action(({ search }) => {
    // Implement user search here
    let url = `https://gitlab.com/api/v4/users?username=${search}`;

    Axios.get(url).then(response => {
      console.log(response.data);
    });
  });

// fetch user gitlab command
program
  .command('users')
  .option('-u --userId <id> User ID')
  .action(({ userId }) => {
    // Implement fetch user detail here
    let url = `https://gitlab.com/api/v4/users/${userId}`;
    Axios.get(url).then(response => {
      let { username, linkedin, twitter, location } = response.data;
      console.log('username', username);
      console.log('linkedin', linkedin);
      console.log('twitter', twitter);
      console.log('location', location);
      console.log(response.data);
    });
  });

// fetch  projects command
// command $ node index.js projects -u "<user-id>" -o star_count -s asc
program
  .command('projects')
  .option('-u --user <string> User ID')
  .option('-o --order <string> Ordering Option')
  .option('-s --sort <string> Sort Option')
  .action(({ user, order, sort }) => {
    // Implement fetch projects for user here
    let url = `https://gitlab.com/api/v4/users/${user}/projects`;
    console.log(url);
    Axios.get(url).then(response => {
      // sort results according to star_count
      const result = response.data.sort((a, b) => {
        return a[order] > b[order];
      });
      console.log(user, order, sort);
      console.log(result);
    });
  });

program.parse(process.argv);
