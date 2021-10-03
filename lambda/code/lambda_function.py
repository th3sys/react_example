import os
import json
import platform

def main(event, context):
    response = {}

    version = platform.python_version()
    response['RUNTIME_VERSION'] = version

    runtime_region = os.environ['AWS_REGION']  if 'AWS_REGION' in os.environ else ''
    response['AWS_REGION'] = runtime_region

    return response


def lambda_handler(event, context):
    res = main(event, context)
    return json.dumps(res)


if __name__ == '__main__':
    test_event = ''
    re = main(test_event, None)
    print(json.dumps(re))
