# Gendiff

Gendiff is a CLI utility that compares two files and outputs difference between them.

![Node CI](https://github.com/TeemourA/frontend-project-lvl2/workflows/Node%20CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/9a786162dd0379721077/maintainability)](https://codeclimate.com/github/TeemourA/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9a786162dd0379721077/test_coverage)](https://codeclimate.com/github/TeemourA/frontend-project-lvl2/test_coverage)

## Installation

1. Clone this repo.
2. Get into cloned directory.
3. Use following commands:

```
make install
make link
```
4. To make sure that utility installed and linked correctly call:
```
gendiff -v
```

## Usage

Gendiff accepts two filepaths as arguments, where the first argument stands for the path to the file before changes and the second one is the path to the file after changes. At the moment only 3 input formats are supported: json, yaml, ini.

For instance:

```
gendiff before.json after.json

// outputs difference

gendiff before.json after.ini

// throws an error
```

Also utility supports 3 output styles: stylish, plain, json. To choose an output format use -f flag and the name of a formatter.
Stylish is a default option.

```
gendiff -f plain before.json after.json
```
More examples are below.

## Contributing
Pull requests are welcome. Please open an issue first to discuss what you would like to change.

## Asciinemas with examples:

**JSON:**

<a href="https://asciinema.org/a/zbxMLcY5JMlPrYAFjYvCybg6C" target="_blank"><img src="https://asciinema.org/a/zbxMLcY5JMlPrYAFjYvCybg6C.svg" /></a>

**YAML:**

<a href="https://asciinema.org/a/Ao9GCzq2b33y89zm5Uhp809v3" target="_blank"><img src="https://asciinema.org/a/Ao9GCzq2b33y89zm5Uhp809v3.svg" /></a>

**INI:**

<a href="https://asciinema.org/a/IGePfOr76kKyROeCtHom9RrtG" target="_blank"><img src="https://asciinema.org/a/IGePfOr76kKyROeCtHom9RrtG.svg" /></a>

**Stylish output format:**

<a href="https://asciinema.org/a/iKiALb5pW5IfHZrsJCzBpIon2" target="_blank"><img src="https://asciinema.org/a/iKiALb5pW5IfHZrsJCzBpIon2.svg" /></a>

**Plain output format:**

<a href="https://asciinema.org/a/W2c5ATsjdOtpeOt70ots9hYwm" target="_blank"><img src="https://asciinema.org/a/W2c5ATsjdOtpeOt70ots9hYwm.svg" /></a>

**JSON output format:**

<a href="https://asciinema.org/a/cxyp2FyyGyr3bmdmARHkxc7e0" target="_blank"><img src="https://asciinema.org/a/cxyp2FyyGyr3bmdmARHkxc7e0.svg" /></a>