
from .serializers import NoteSerializer
from .models import Note
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response



# Create your views here.
class getNotesList(APIView):
    
    def get(self, request, format=None):
        snippets = Note.objects.all()
        serializer = NoteSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoteDetail(APIView):
    def get(self, request, pk):
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

class NoteCreate(APIView):
    def post(self, request):
        data = request.data
        note = Note.objects.create(body=data['body'])
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class NoteUpdate(APIView):
    def put(self, request, pk):
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance=note, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NoteDelete(APIView):
    def delete(self, request, pk):
        try:
            note = Note.objects.get(id=pk)
            note.delete()
            return Response('Note was deleted!', status=status.HTTP_204_NO_CONTENT)
        except Note.DoesNotExist:
            return Response("Note not found", status=status.HTTP_404_NOT_FOUND)