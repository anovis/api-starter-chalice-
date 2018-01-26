import sys
from chalice.cli import main

if __name__ == "__main__":
    sys.argv[0]= ""
    sys.exit(main())