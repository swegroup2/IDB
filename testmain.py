import unittest
from testartists import *
from testdatabase import *

if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(TestArtistEndpoints)
    unittest.TextTestRunner().run(suite)
    suite = unittest.TestLoader().loadTestsFromTestCase(TestDatabaseFunctions)
    unittest.TextTestRunner().run(suite)
