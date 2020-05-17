export const getExpected = () => (
  {
    stylish: `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`,
    plain: `Property 'common.setting2' was deleted
Property 'common.setting3' was changed from 'true' to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: 'false'
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from [complex value] to 'str'
Property 'group2' was deleted
Property 'group3' was added with value: [complex value]`,
    json: `[
  {
    "key": "common",
    "type": "nested",
    "children": [
      {
        "key": "setting1",
        "type": "unchanged",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "type": "deleted",
        "value": 200
      },
      {
        "key": "setting3",
        "type": "changed",
        "oldVal": true,
        "newVal": {
          "key": "value"
        }
      },
      {
        "key": "setting6",
        "type": "nested",
        "children": [
          {
            "key": "key",
            "type": "unchanged",
            "value": "value"
          },
          {
            "key": "ops",
            "type": "added",
            "value": "vops"
          }
        ]
      },
      {
        "key": "follow",
        "type": "added",
        "value": false
      },
      {
        "key": "setting4",
        "type": "added",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "type": "added",
        "value": {
          "key5": "value5"
        }
      }
    ]
  },
  {
    "key": "group1",
    "type": "nested",
    "children": [
      {
        "key": "baz",
        "type": "changed",
        "oldVal": "bas",
        "newVal": "bars"
      },
      {
        "key": "foo",
        "type": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "type": "changed",
        "oldVal": {
          "key": "value"
        },
        "newVal": "str"
      }
    ]
  },
  {
    "key": "group2",
    "type": "deleted",
    "value": {
      "abc": 12345
    }
  },
  {
    "key": "group3",
    "type": "added",
    "value": {
      "fee": 100500
    }
  }
]`,
  });

export const getFixtures = () => (
  {
    before: {
      json: './__fixtures__/deepBefore.json',
      yaml: './__fixtures__/deepBefore.yml',
      ini: './__fixtures__/deepBefore.ini',
    },
    after: {
      json: './__fixtures__/deepAfter.json',
      yaml: './__fixtures__/deepAfter.yml',
      ini: './__fixtures__/deepAfter.ini',
    },
  });
