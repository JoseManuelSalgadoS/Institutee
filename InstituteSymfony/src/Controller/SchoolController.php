<?php

namespace App\Controller;

header('Access-Control-Allow-Origin: *');

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\JsonResponse;

class SchoolController extends AbstractController
{

    public function schools()
    {
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('SELECT s.id, s.name, s.street, s.created, s.updated, s.status FROM App:School s');
        $listSchools = $query->getResult();

        $data = [
            'status' => 200,
            'mesage' => 'No hay registros en la base de datos :D',
        ];

        if(count($listSchools) > 0){
            $data = [
                'status' => 200,
                'mesage' => 'Se encontraron ' . count($listSchools) . ' resultados',
                'listSchools' => $listSchools
            ];
        }

        return new JsonResponse($data);
    }

    public function create(Request $request){
        $em = $this->getDoctrine()->getManager();
        
        $name = $request->get('name', null);
        $street = $request->get('street', null);
        $created = $request->get('created', null);
        $updated = $request->get('updated', null);

        $school = new \App\Entity\School();

        $school->setName($name);
        $school->setStreet($street);
        $school->setName($created);
        $school->setStreet($updated);
        $school->setStatus(1);

        $em->persist($school);
        $em->flush();

        $data = [
            'status' => 200,
            'message' => 'Registro exitoso :D'
        ];

        return new JsonResponse($data);
    }

    public function update(Request $request, $id){
        $em = $this->getDoctrine()->getManager();
        
        $name = $request->get('name', null);
        $street = $request->get('street', null);
        $created = $request->get('created', null);
        $updated = $request->get('updated', null);

        $query = $em->createQuery('UPDATE App:School s SET s.name = :name, s.street = :street, s.created = :created, s.updated = :updated WHERE s.id = :id');
        $query->setParameter(':name', $name);
        $query->setParameter(':street', $street);
        $query->setParameter(':created', $created);
        $query->setParameter(':updated', $updated);
        $query->setParameter(':id', $id);
        $flag = $query->getResult();

        if($flag == 1){
            $data = [ 'status' => 200, 'message' => 'Se ha actualizado correctamente :D' ];
        } else {
            $data = [ 'status' => 400, 'message' => 'No se ha actualizado correctamente :O' ];
        }

        return new JsonResponse($data);
    }

    public function delete($id){
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('UPDATE App:School s SET s.status = 0 WHERE s.id = :id');
        $query->setParameter(':id', $id);
        $school = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'Se dehabilitó el producto :O',
            'school' => $school
        ];

        return new JsonResponse($data);
    }
}
