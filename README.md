Create a gitlab-cli application that consumes the gitlab api and allows users to run commands to:

GitLab API_URL: https://gitlab.com/api/v4/
GitLab API Docs: https://docs.gitlab.com/ee/api/README.html

The CLI should provide command for the following:

1. Search for users using a search parameter

- examples of search parameters to use (iamphill, samdbeckham)
  https://docs.gitlab.com/ee/api/users.html#for-normal-users

2. Fetch user profile details the API using their user ID

- Endpoint: https://docs.gitlab.com/ee/api/users.html#single-user
- Details to Show users name, location, twitter, linkedin

3. Fetch List of personal projects owned by the user ordered by date created

- Endpoint: https://docs.gitlab.com/ee/api/projects.html#list-user-projects
- Details to show: Name, Descriptions, Number of Forks, Number of Stars, Date Created

_BONUS_

4. User the sort options on the projects command to sort the users projects based on `star_count`;

## Commands

$ node index.js search -s "<username>"
$ node index.js users -u "<user-id>"
$ node index.js projects -u "<user-id>"
$ node index.js projects -u "<user-id>" -o star_count -s asc
