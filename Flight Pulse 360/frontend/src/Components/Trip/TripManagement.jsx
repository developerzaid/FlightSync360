import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Filter,
  Plane
} from 'lucide-react';
import AddTrip from './AddTrip';
import TripDetails from './TripDetails';
import UpdateTrip from './UpdateTrip';

const TripManagement = ({ companyId }) => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Modals
  const [showAddTrip, setShowAddTrip] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [showUpdateTrip, setShowUpdateTrip] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, [companyId]);

  useEffect(() => {
    filterTrips();
  }, [trips, searchQuery, filterStatus]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8084/all-trips/${companyId}`);
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTrips = () => {
    let filtered = [...trips];

    if (searchQuery) {
      filtered = filtered.filter(
        (trip) =>
          trip.mt_tripNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.mt_fromAirport?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.mt_toAirport?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.uxTripId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'ALL') {
      filtered = filtered.filter((trip) => trip.mt_status === filterStatus);
    }

    setFilteredTrips(filtered);
  };

  const handleAddTrip = async (tripData) => {
    try {
      const response = await fetch('http://localhost:8084/add-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripData)
      });
      if (response.ok) {
        fetchTrips();
        setShowAddTrip(false);
      }
    } catch (error) {
      console.error('Error adding trip:', error);
    }
  };

  const handleDeleteTrip = async () => {
    if (!tripToDelete) return;
    try {
      const response = await fetch(`http://localhost:8084/delete-trip/${tripToDelete.uxTripId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchTrips();
        setShowDeleteConfirm(false);
        setTripToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      DRAFT: 'bg-gray-100 text-gray-700',
      PLANNED: 'bg-blue-100 text-blue-700',
      CONFIRMED: 'bg-green-100 text-green-700',
      IN_PROGRESS: 'bg-orange-100 text-orange-700',
      COMPLETED: 'bg-purple-100 text-purple-700',
      CANCELLED: 'bg-red-100 text-red-700'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${colors[status] || colors.DRAFT}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-600">Loading trips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-300 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plane className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg font-bold text-gray-900">Trip Management</h1>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 bg-gray-100 rounded">
                Total: <strong>{trips.length}</strong>
              </span>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
                Active: <strong>{trips.filter(t => t.mt_status === 'IN_PROGRESS').length}</strong>
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                Confirmed: <strong>{trips.filter(t => t.mt_status === 'CONFIRMED').length}</strong>
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowAddTrip(true)}
            className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-1.5 font-semibold"
          >
            <Plus className="w-4 h-4" />
            Create Trip
          </button>
        </div>
      </div>

      {/* Compact Filters */}
      <div className="bg-white border-b border-gray-300 px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search trip number, route, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PLANNED">Planned</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <button
            onClick={fetchTrips}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dense Table */}
      <div className="flex-1 overflow-auto">
        {filteredTrips.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Plane className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No trips found</p>
              <button
                onClick={() => setShowAddTrip(true)}
                className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Create First Trip
              </button>
            </div>
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="border-b border-gray-300">
                <th className="px-3 py-2 text-left font-bold text-gray-700">Trip #</th>
                <th className="px-3 py-2 text-left font-bold text-gray-700">Type</th>
                <th className="px-3 py-2 text-left font-bold text-gray-700">Route</th>
                <th className="px-3 py-2 text-left font-bold text-gray-700">Departure</th>
                <th className="px-3 py-2 text-left font-bold text-gray-700">Purpose</th>
                <th className="px-3 py-2 text-left font-bold text-gray-700">Status</th>
                <th className="px-3 py-2 text-right font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map((trip) => (
                <tr
                  key={trip.uxTripId}
                  className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    setSelectedTrip(trip);
                    setShowTripDetails(true);
                  }}
                >
                  <td className="px-3 py-2">
                    <span className="font-semibold text-gray-900">
                      {trip.mt_tripNumber || trip.uxTripId}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{trip.mt_tripType}</td>
                  <td className="px-3 py-2">
                    <span className="font-semibold text-gray-900">
                      {trip.mt_fromAirport} → {trip.mt_toAirport}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {trip.mt_scheduledDepartureUtc
                      ? new Date(trip.mt_scheduledDepartureUtc).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Not set'}
                  </td>
                  <td className="px-3 py-2 text-gray-600">{trip.mt_purpose || '-'}</td>
                  <td className="px-3 py-2">{getStatusBadge(trip.mt_status)}</td>
                  <td className="px-3 py-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          setSelectedTrip(trip);
                          setShowTripDetails(true);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTrip(trip);
                          setShowUpdateTrip(true);
                        }}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setTripToDelete(trip);
                          setShowDeleteConfirm(true);
                        }}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      {showAddTrip && (
        <AddTrip
          isOpen={showAddTrip}
          onClose={() => setShowAddTrip(false)}
          onSave={handleAddTrip}
          companyId={companyId}
        />
      )}

      {showTripDetails && selectedTrip && (
        <TripDetails
          isOpen={showTripDetails}
          onClose={() => setShowTripDetails(false)}
          trip={selectedTrip}
          onEdit={() => {
            setShowTripDetails(false);
            setShowUpdateTrip(true);
          }}
        />
      )}

      {showUpdateTrip && selectedTrip && (
        <UpdateTrip
          isOpen={showUpdateTrip}
          onClose={() => setShowUpdateTrip(false)}
          trip={selectedTrip}
          onUpdate={() => {
            fetchTrips();
            setShowUpdateTrip(false);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && tripToDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Trip?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Delete <strong>{tripToDelete.mt_tripNumber || tripToDelete.uxTripId}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTrip}
                className="px-4 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripManagement;