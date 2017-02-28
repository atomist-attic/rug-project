# Atomist 'rug-project'

[![Build Status](https://travis-ci.org/atomist-rugs/rug-project.svg?branch=master)](https://travis-ci.org/atomist-rugs/rug-project)
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)

This [Rug][rug] project contains a Rug archive project generator.

[rug]: http://docs.atomist.com/

After you create a project with one of these generators, you may enjoy
the compatible editors in [atomist-rugs:rug-editors][rug-editors].

[rug-editors]: https://github.com/atomist-rugs/rug-editors

## Rugs

### NewRugProject

The NewRugProject generator creates a new Rug archive project.

#### Prerequisites

There are no prerequisites to running this generator.

#### Parameters

To run this generator, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`project_name` | Yes | |  A valid GitHub repository name, which contains alphanumberic, _, and - characters
`group_id` | Yes | |  Maven group ID, e.g., "company-rugs", typically the GitHub owner of the repo being created is used
`description` | Yes | | A brief description of the project
`version` | No | 0.1.0 | [Semantic version][semver] of the project

#### Running

Run it as follows:

```
$ cd parent/directory
$ rug generate atomist-rugs:rug-archive:NewRugProject \
    ruggery \
    group_id=persian-rugs \
    description="Rug archive to hold my Rugs" \
    version=0.1.0
```

Note the first parameter, the `project_name`, is different in that you
do not need to supply the name of the parameter, just the value.  This
is because the `project_name` parameter is required for all
generators.  This will create a directory named `ruggery` and populate
it with a working Rug archive project.

See the Rugs available in [atomist-rugs:rug-editors][rug-editors] to
add further functionality to your new Rug project.

### NewStarterRugProject

The NewStarterRugProject generator creates a new Rug archive project
using a standard layout, sensible defaults, and a simple TypeScript
editor.  It is a great way to get started writing Rugs!

#### Prerequisites

There are no prerequisites to running this generator.

#### Parameters

To run this generator, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`project_name` | Yes | |  A valid GitHub repository name, which contains alphanumberic, _, and - characters

#### Running

Run it as follows:

```
$ cd parent/directory
$ rug generate atomist-rugs:rug-archive:NewStarterRugProject ruggery
```

Note the `project_name` parameter is different in that you do not need
to supply the name of the parameter, just the value.  This is because
the `project_name` parameter is required for all generators.  This
will create a directory named `ruggery` and populate it with a working
Rug archive project with a standard layout and a simple editor.

See the Rugs available in [atomist-rugs:rug-editors][rug-editors] to
add further functionality to your new Rug project.

## Support

General support questions should be discussed in the `#support`
channel on our community Slack team
at [atomist-community.slack.com][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist-rugs/rug-project/issues

## Development

You can build, test, and install the project locally with
the [Rug CLI][cli].

[cli]: https://github.com/atomist/rug-cli

```
$ rug test
$ rug install
```

To create a new release of the project, simply push a tag of the form
`M.N.P` where `M`, `N`, and `P` are integers that form the next
appropriate [semantic version][semver] for release.  For example:

[semver]: http://semver.org

```
$ git tag -a 1.2.3
```

The Travis CI build (see badge at the top of this page) will
automatically create a GitHub release using the tag name for the
release and the comment provided on the annotated tag as the contents
of the release notes.  It will also automatically upload the needed
artifacts.

---
Created by [Atomist][atomist].
Need Help?  [Join our Slack team][slack].

[atomist]: https://www.atomist.com/
[slack]: https://join.atomist.com/
