import unittest
from test.artists import *

if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(TestArtistEndpoints)
    unittest.TextTestRunner().run(suite)

