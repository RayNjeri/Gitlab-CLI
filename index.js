require('dotenv').config();
let program = require('commander');
let Axios = require('axios');

const url = 'https://gitlab.com/api/v4/users';

// search gitlab command
program
  .command('search')
  .option('-s --search <string> Search parameter')
  .action(({ search }) => {
    // Implement user search here
    let url1 = url + `?username=${search}`;

    Axios.get(url1).then(response => {
      console.log(response.data);
    });
  });

// fetch user gitlab command
program
  .command('users')
  .option('-u --userId <id> User ID')
  .action(({ userId }) => {
    // Implement fetch user detail here
    let url2 = url + `/${userId}`;
    Axios.get(url2).then(response => {
      let { username, linkedin, twitter, location } = response.data;
      console.log('username', username);
      console.log('linkedin', linkedin);
      console.log('twitter', twitter);
      console.log('location', location);
      // console.log(response.data);
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
    // let url3 = url + `/${user}/projects/`;

    // if (sort) {
    //   url = url + `?=${sort}`;
    // }
    // let url = `https://gitlab.com/api/v4/users/${user}/projects/?sort=${sort}`;
    let url = `https://gitlab.com/api/v4/users/${user}/projects/?${
      sort ? 'sort=' + sort : ''
    }`;
    console.log(url);
    Axios.get(url).then(response => {
      // sort results according to star_count
      const result = response.data.sort((a, b) => {
        return a[order] < b[order];
      });
      // const results = result.map(projects => ({
      //   name: projects.name,
      //   created: projects.created_at,
      //   star: projects.star_count
      // }));
      const results = result.map(({ name, created_at, star_count }) => ({
        name,
        created_at,
        star_count
      }));

      console.log(user, order, sort);

      console.log(results);
    });
  });

program.parse(process.argv);
